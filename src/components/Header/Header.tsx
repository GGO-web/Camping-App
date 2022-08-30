import React from "react";

import { Assets, Button, Icon, Text, View } from "react-native-ui-lib";

import { headerStyles } from "./HeaderStyles";

export const Header = ({ title }: { title: string }) => {
   return (
      <View style={headerStyles.header}>
         <Button
            left
            style={headerStyles.headerButton}
            backgroundColor="transparent"
            iconSource={Assets.getAssetByPath("icons.menu")}
         ></Button>

         <Text style={headerStyles.headerTitle} heading4>
            {title}
         </Text>
      </View>
   );
};
