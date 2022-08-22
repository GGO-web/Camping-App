import React from "react";
import { Button, Icon, Text } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

export const CrumbsLink = ({ children }: { children: any }) => {
   const navigation = useNavigation();

   return (
      <Button
         left
         marginV-25
         onPress={() => navigation.goBack()}
         centerV
         backgroundColor="transparent"
      >
         <Icon marginR-8 width={32} height={32} assetName="chevron_left"></Icon>

         <Text mrAuto>{children}</Text>
      </Button>
   );
};
