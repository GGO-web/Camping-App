import React from 'react';

import {
  Colors, Text, TouchableOpacity, View,
} from 'react-native-ui-lib';

import { Calendar, DateData } from 'react-native-calendars';

export function DateInput({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: string;
  setStartDate: Function;
  endDate: string;
  setEndDate: Function;
}) {
  const isDateInThePast = (
    dateString: string,
    dateStringMain: string,
  ): boolean => new Date(dateString) < new Date(dateStringMain);

  const dateInRange = (date: DateData) => {
    const currentDate = new Date(date?.dateString);
    const startDateTimestamp = new Date(startDate);
    const endDateTimestamp = new Date(endDate);

    return currentDate >= startDateTimestamp && currentDate <= endDateTimestamp;
  };

  return (
    <View>
      <Calendar
        style={{
          borderRadius: 13,
          paddingVertical: 10,
        }}
        onDayPress={(day) => {
          if (startDate === day.dateString) {
            setStartDate('');
            setEndDate('');
          } else if (
            startDate?.length === 0
            || (isDateInThePast(day.dateString, startDate) && endDate)
          ) {
            setStartDate(day.dateString);
          } else if (isDateInThePast(day.dateString, startDate)) {
            setStartDate(day.dateString);
            setEndDate(startDate);
          } else {
            setEndDate(day.dateString);
          }
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        dayComponent={({
          date, onPress, onLongPress, state,
        }: any) => {
          const isSunday = (date: DateData) => new Date(date?.dateString).getDay() === 0;

          const isSaturday = (date: DateData) => new Date(date?.dateString).getDay() === 6;

          const isFirstOrLastDate = (date: DateData) => {
            const currentDate = date?.timestamp;
            const startDateTimestamp = new Date(startDate).getTime();
            const endDateTimestamp = new Date(endDate).getTime();

            return (
              currentDate === startDateTimestamp
              || currentDate === endDateTimestamp
            );
          };

          return (
            <View
              key={date?.dateString}
              style={{
                backgroundColor: dateInRange(date) ? Colors.primary50 : null,
                borderTopLeftRadius:
                  date?.dateString === startDate || isSunday(date) ? 20 : 0,
                borderBottomLeftRadius:
                  date?.dateString === startDate || isSunday(date) ? 20 : 0,

                borderTopRightRadius:
                  date?.dateString === endDate || isSaturday(date) ? 20 : 0,
                borderBottomRightRadius:
                  date?.dateString === endDate || isSaturday(date) ? 20 : 0,
                paddingVertical: 4,
                paddingHorizontal: 11,
              }}
            >
              <TouchableOpacity
                onPress={() => onPress(date)}
                onLongPress={() => onLongPress(date)}
                activeOpacity={0.4}
                style={{
                  borderRadius: 100,
                  backgroundColor: isFirstOrLastDate(date)
                    ? Colors.primary
                    : '',
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  text
                  style={{
                    textAlign: 'center',
                    color: isFirstOrLastDate(date)
                      ? Colors.white
                      : state === 'today'
                        ? Colors.primary
                        : state === 'disabled'
                          ? Colors.gray300
                          : Colors.dark,
                  }}
                >
                  {date?.day}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        theme={
          {
            'stylesheet.calendar.main': {
              dayContainer: {
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
              week: {
                marginTop: 2,
                marginBottom: 2,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
            selectedDayBackgroundColor: 'transparent',
          } as any
        }
        markingType="period"
        enableSwipeMonths
      />
    </View>
  );
}
