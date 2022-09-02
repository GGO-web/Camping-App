import React, { useEffect } from "react";
import { Animated } from "react-native";

import { Assets, Button, Text, View } from "react-native-ui-lib";

import { headerStyles } from "./HeaderStyles";

export const Header = ({
   title,
   showMenu,
   setShowMenu,
   scaleValue,
   offsetValue,
}: {
   title: string;
   showMenu: boolean;
   setShowMenu: Function;
   scaleValue: any;
   offsetValue: any;
}) => {
   useEffect(() => {
      Animated.timing(scaleValue, {
         toValue: !showMenu ? 1 : 0.88,
         duration: 300,
         useNativeDriver: true,
      }).start();

      Animated.timing(offsetValue, {
         // YOur Random Value...
         toValue: !showMenu ? 0 : 230,
         duration: 300,
         useNativeDriver: true,
      }).start();
   }, [showMenu, scaleValue, offsetValue]);

   return (
      <View style={headerStyles.header}>
         <Button
            left
            padding-5
            style={{
               ...headerStyles.headerButton,
            }}
            backgroundColor="transparent"
            iconSource={
               !showMenu
                  ? Assets.getAssetByPath("icons.menu")
                  : Assets.getAssetByPath("icons.back")
            }
            onPress={() => {
               setShowMenu(!showMenu);
            }}
         ></Button>

         <Text style={headerStyles.headerTitle} heading4>
            {title}
         </Text>
      </View>
   );
};
