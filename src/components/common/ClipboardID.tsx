import React from "react";
import { Assets, Button, Colors, Text, View } from "react-native-ui-lib";

import * as Clipboard from "expo-clipboard";

import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/userConfig/userSlice";

export const ClipboardID = () => {
   const { uid: userId } = useAppSelector(userSelector);

   const clipboardHandler = async () => {
      await Clipboard.setStringAsync(userId);
   };

   return (
      <View
         marginV-28
         style={{
            backgroundColor: Colors.primary50,
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 16,
         }}
      >
         <Text primary marginB-4>
            your ID
         </Text>

         <View centerV row spread>
            <Text paragraph2 primary900 selectable={true}>
               {userId.slice(0, 10).toUpperCase()}
            </Text>

            <Button
               backgroundColor="transparent"
               style={{ width: 32, height: 32 }}
               iconSource={Assets.icons.copy}
               iconStyle={{ tintColor: Colors.primary900 }}
               onPress={() => clipboardHandler()}
            ></Button>
         </View>
      </View>
   );
};
