import React, { useState } from "react";

import {
   Assets,
   Button,
   Colors,
   Dialog,
   Modal,
   Text,
   View,
} from "react-native-ui-lib";

import { DateInput } from "./components/DateInput/DateInput";

import { globalStyles } from "../../styles/global";

export const CalendarToggler = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <View>
         <Button
            style={{
               ...globalStyles.text,
               ...globalStyles.input,
               ...{
                  borderColor: "#F4F4F5",
               },
            }}
            backgroundColor={Colors.primary}
            iconOnRight={true}
            iconSource={Assets.icons.chevron_down}
            iconStyle={{
               tintColor: Colors.gray300,
               width: 10,
               height: 6,
               resizeMode: "stretch",
            }}
            onPress={() => setIsOpen(!isOpen)}
         >
            <Text
               flex
               left
               style={{
                  ...globalStyles.text,
                  color: "#A1A1AA",
                  textAlign: "left",
               }}
            >
               Pick Date
            </Text>
         </Button>

         <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
            <DateInput></DateInput>
         </Dialog>
      </View>
   );
};
