import React, { useEffect, useState } from 'react';
import {
  Colors, View, Text, Image, ProgressBar,
} from 'react-native-ui-lib';
import { Pedometer } from 'expo-sensors';

import { EFitnessTrackerTypes, IFitnessTracker } from '../../../../models/FitnessTracker.model';
import { useAppSelector } from '../../../../redux/hooks';
import { getActivatedTripCollectionItemSelector } from '../../../../redux/tripsCollection/tripsCollection';
import { MILES_IN_ONE_STEP } from '../../../../constants';

export function FitnessTracker({
  trackerName,
  tracker,
}: {
  trackerName: EFitnessTrackerTypes,
  tracker: IFitnessTracker
}) {
  const [currentTrackerValue, setCurrentTrackerValue] = useState(tracker.currentValue);
  const trackerProgress = parseFloat(Math.min((
    (trackerName === EFitnessTrackerTypes.running
      ? currentTrackerValue
      : (MILES_IN_ONE_STEP * currentTrackerValue))
    / tracker.target
  ) * 100, 100).toFixed(2));

  const tripPeriod = useAppSelector(getActivatedTripCollectionItemSelector)?.trip.tripPeriod;

  const stepTrackerSubscriber = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable) {
      const pastStepCountResult = await Pedometer.getStepCountAsync(
        new Date(tripPeriod?.startDate as string),
        new Date((tripPeriod?.endDate || tripPeriod?.startDate) as string),
      );

      if (pastStepCountResult) {
        setCurrentTrackerValue(pastStepCountResult.steps);
      }

      Pedometer.watchStepCount((result) => {
        const getStepCount = async () => {
          const pastStepCountResult = await Pedometer.getStepCountAsync(
            new Date(tripPeriod?.startDate as string),
            new Date((tripPeriod?.endDate || tripPeriod?.startDate) as string),
          );

          if (pastStepCountResult) {
            setCurrentTrackerValue(pastStepCountResult.steps);
          } else {
            setCurrentTrackerValue(result.steps);
          }
        };

        getStepCount();
      });
    }
  };

  useEffect(() => {
    stepTrackerSubscriber();
  }, []);

  return (
    <View
      padding-24
      marginB-24
      style={{
        backgroundColor: Colors.primary50,
        borderRadius: 20,
      }}
    >
      <View row centerV spread>
        <View row centerV>
          <Image
            marginR-8
            style={{ width: 20, height: 20 }}
            source={tracker.icon}
          />
          <Text>{tracker.title}</Text>
        </View>

        <Text paragraph1 primary900>
          {tracker.target}
          {' '}
          {tracker.unit}
        </Text>
      </View>

      <Text marginB-8 paragraph2 primary700>
        {`${trackerProgress}%`}
      </Text>

      <ProgressBar
        progress={trackerProgress}
        progressColor={Colors.primary500}
        style={{
          backgroundColor: Colors.primary200,
          height: 14,
        }}
      />
    </View>
  );
}
