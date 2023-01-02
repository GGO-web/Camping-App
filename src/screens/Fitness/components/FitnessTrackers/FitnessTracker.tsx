import React from 'react';
import {
  Colors, View, Text, Image, ProgressBar,
} from 'react-native-ui-lib';
import type { EFitnessTrackerTypes, IFitnessTracker } from '../../../../models/FitnessTracker.model';

export function FitnessTracker({
  trackerName,
  tracker,
}: {
  trackerName: EFitnessTrackerTypes,
  tracker: IFitnessTracker
}) {
  const trackerProgress = tracker.currentValue / tracker.target;

  console.log(trackerName);

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
          steps
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
