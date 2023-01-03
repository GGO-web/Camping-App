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

  const [dayNumber, remainingDays, remainStatus] = getRemainingDaysNumber(
    tripPeriod?.startDate as string,
    tripPeriod?.endDate as string,
  );

  return (
    <View bottom row spread marginB-32>
      <Text primary900 heading3>
        {remainStatus ? `Day ${dayNumber}` : `${dayNumber} day's to trip`}
      </Text>

      <Text paragraph3 gray300>
        {`${
          Number.isNaN(+remainingDays) ? '∞' : remainingDays
        } day's remain ${
          Number.isNaN(+remainingDays) ? 'till the end' : ''
        }`}
      </Text>
    </View>
  );
}
