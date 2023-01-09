import React, { useState } from 'react';

import {
  Assets,
  Button,
  Colors,
  Dialog,
  Text,
  View,
} from 'react-native-ui-lib';

import dayjs from 'dayjs';
import { DateInput } from './components/DateInput/DateInput';

import { ITripPeriod } from '../../models/Trip.model';
import { AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

export function CalendarToggler({
  tripPeriod,
  setTripPeriod,
}: {
  tripPeriod?: ITripPeriod,
  setTripPeriod?: Function
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(tripPeriod?.startDate || '');
  const [endDate, setEndDate] = useState(tripPeriod?.endDate || '');

  const getCalendarToggleText = () => {
    const start = dayjs(startDate).format('DD MMMM');
    const end = dayjs(endDate || startDate).format('DD MMMM');

    if (start === end) {
      return `Since ${start}`;
    }

    return `${start} To ${end}`;
  };

  return (
    <View>
      <Button
        style={{
          ...globalStyles.text,
          ...globalStyles.input,
          ...{
            borderColor: '#F4F4F5',
          },
        }}
        backgroundColor={Colors.primary}
        iconOnRight
        iconSource={(Assets.icons as AssetsIconsType).chevron_down}
        iconStyle={{
          tintColor: Colors.gray300,
          width: 20,
          height: 12,
          resizeMode: 'contain',
          transform: startDate ? [{ rotate: '180deg' }] : [],
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          flex
          left
          style={{
            ...globalStyles.text,
            color: '#A1A1AA',
            textAlign: 'left',
          }}
        >
          {startDate ? getCalendarToggleText() : 'Pick Date'}
        </Text>
      </Button>

      <Dialog
        visible={isOpen}
        onDismiss={() => {
          if (setTripPeriod) {
            setTripPeriod({
              startDate,
              endDate,
              formatted: getCalendarToggleText(),
            });
          }

          setIsOpen(false);
        }}
      >
        <DateInput
          {...{
            startDate, setStartDate, endDate, setEndDate,
          }}
        />
      </Dialog>
    </View>
  );
}
