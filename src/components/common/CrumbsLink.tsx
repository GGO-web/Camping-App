import React from "react";
import { Button, Icon, Text } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

export const CrumbsLink = ({ children }: { children: any }) => {
   const navigation = useNavigation();

   return (
      <Button
         left
         marginB-25
         onPress={() => navigation.goBack()}
         centerV
         backgroundColor="transparent"
      >
         <Icon
            style={{ width: 14, height: 14, resizeMode: "contain" }}
            marginR-8
            assetName="chevron_left"
         ></Icon>

         <Text paragraph1 mrAuto>
            {children}
         </Text>
      </Button>
   );
};
