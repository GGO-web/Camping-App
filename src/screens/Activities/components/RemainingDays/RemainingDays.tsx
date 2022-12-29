import React from 'react';
import { View, Text } from 'react-native-ui-lib';

import { useAppSelector } from '../../../../redux/hooks';

import { getRemainingDaysNumber } from '../../../../helpers/getRemainingDaysNumber';

export function RemainingDays() {
  const tripPeriod = useAppSelector(
    (store) => store.tripsCollection.trips.find(
      (tripCollectionItem) => tripCollectionItem.activated,
    ),
  )?.trip.tripPeriod;

  const [dayNumber, remainingDays] = getRemainingDaysNumber(
    tripPeriod?.startDate as string,
    tripPeriod?.endDate as string,
  );

  return (
    <View centerV row spread marginV-16>
      <Text primary900 heading3>
        Day
        {' '}
        {dayNumber}
      </Text>

      <Text paragraph3 gray300>
        {remainingDays}
        {' '}
        day&apos;s remain
      </Text>
    </View>
  );
}
