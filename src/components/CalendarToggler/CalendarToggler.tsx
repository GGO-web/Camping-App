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

import { globalStyles } from '../../styles/global';

export function CalendarToggler() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
        iconSource={Assets.icons.chevron_down}
        iconStyle={{
          tintColor: Colors.gray300,
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

      <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
        <DateInput
          {...{
            startDate, setStartDate, endDate, setEndDate,
          }}
        />
      </Dialog>
    </View>
  );
}
