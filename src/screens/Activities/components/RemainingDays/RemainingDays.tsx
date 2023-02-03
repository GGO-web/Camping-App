import React from 'react';
import { View, Text } from 'react-native-ui-lib';

import { useGetActivatedTripQuery } from '../../../../redux/api/trip';

import { getRemainingDaysNumber } from '../../../../helpers/getRemainingDaysNumber';

export function RemainingDays() {
  const { data: activatedTrip } = useGetActivatedTripQuery();
  const tripPeriod = activatedTrip?.tripPeriod;

  const [dayNumber, remainingDays, remainStatus] = getRemainingDaysNumber(
    tripPeriod?.startDate as string,
    tripPeriod?.endDate as string,
  );

  return (
    <View bottom row spread marginB-32>
      <Text primary900 heading3>
        {
        +dayNumber <= 0 ? 'Trip was over'
          : remainStatus
            ? `Day ${dayNumber}`
            : `${dayNumber} day's to trip`
        }
      </Text>

      {+dayNumber > 0
        ? (
          <Text paragraph3 gray300>
            {`${
              Number.isNaN(+remainingDays) ? '∞' : remainingDays
            } day's remain ${
              Number.isNaN(+remainingDays) ? 'till the end' : ''
            }`}
          </Text>
        ) : null}
    </View>
  );
}
