import React, { useEffect, useState } from "react";

import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";

import { Calendar, DateData } from "react-native-calendars";
import { boolean } from "yup";

export const DateInput = () => {
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [monthChanged, setMonthChanged] = useState(true);

   const isDateInThePast = (
      dateString: string,
      dateStringMain: string
   ): boolean => {
      return new Date(dateString) < new Date(dateStringMain);
   };

   const dateInRange = (date: DateData) => {
      const currentDate = new Date(date.dateString);
      const startDateTimestamp = new Date(startDate);
      const endDateTimestamp = new Date(endDate);

      return (
         currentDate >= startDateTimestamp && currentDate <= endDateTimestamp
      );
   };

   return (
      <View>
         <Calendar
            onDayPress={(day) => {
               if (startDate === day.dateString) {
                  setStartDate("");
                  setEndDate("");
               } else if (
                  startDate.length === 0 ||
                  (isDateInThePast(day.dateString, startDate) && endDate)
               ) {
                  setStartDate(day.dateString);
               } else {
                  setEndDate(day.dateString);
               }
            }}
            onMonthChange={() => setMonthChanged(!monthChanged)}
            dayComponent={({
               date,
               onPress,
               onLongPress,
               state,
            }: {
               date: DateData;
               onPress: Function;
               onLongPress: Function;
               state: any;
            }) => {
               const isSunday = (date: DateData) => {
                  return new Date(date.dateString).getDay() === 0;
               };

               const isSaturday = (date: DateData) => {
                  return new Date(date.dateString).getDay() === 6;
               };

               const isFirstOrLastDate = (date: DateData) => {
                  const currentDate = date.timestamp;
                  const startDateTimestamp = new Date(startDate).getTime();
                  const endDateTimestamp = new Date(endDate).getTime();

                  return (
                     currentDate === startDateTimestamp ||
                     currentDate === endDateTimestamp
                  );
               };

               return (
                  <View
                     style={{
                        backgroundColor: dateInRange(date)
                           ? Colors.primary50
                           : null,
                        borderTopLeftRadius:
                           date.dateString === startDate || isSunday(date)
                              ? 20
                              : 0,
                        borderBottomLeftRadius:
                           date.dateString === startDate || isSunday(date)
                              ? 20
                              : 0,

                        borderTopRightRadius:
                           date.dateString === endDate || isSaturday(date)
                              ? 20
                              : 0,
                        borderBottomRightRadius:
                           date.dateString === endDate || isSaturday(date)
                              ? 20
                              : 0,
                        paddingVertical: 7,
                        paddingHorizontal: 15,
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
                              : "",
                           width: 32,
                           height: 32,
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        <Text
                           text
                           style={{
                              textAlign: "center",
                              color:
                                 date.dateString === startDate ||
                                 date.dateString === endDate
                                    ? Colors.white
                                    : state === "today"
                                    ? Colors.primary
                                    : state === "disabled"
                                    ? Colors.gray300
                                    : Colors.dark,
                           }}
                        >
                           {date.day}
                        </Text>
                     </TouchableOpacity>
                  </View>
               );
            }}
            theme={{
               "stylesheet.calendar.main": {
                  dayContainer: {
                     flexDirection: "row",
                     justifyContent: "space-around",
                  },
                  week: {
                     marginTop: 2,
                     marginBottom: 2,
                     flexDirection: "row",
                     justifyContent: "space-around",
                  },
               },
            }}
            markingType="period"
            enableSwipeMonths={true}
         ></Calendar>
      </View>
   );
};
