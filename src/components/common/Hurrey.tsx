import React from "react";
import {
   Button,
   Colors,
   Image,
   Text,
   Typography,
   View,
} from "react-native-ui-lib";
import { globalStyles, mergeStyles } from "../../styles/global";

export const Hurrey = ({
   navigation,
   route,
}: {
   navigation: any;
   route: any;
}) => {
   return (
      <View style={globalStyles.container}>
         <Image
            style={mergeStyles([
               globalStyles.imageCenter,
               { marginBottom: 24 },
            ])}
            source={require("../../../assets/hurrey.png")}
         ></Image>
         <Text
            style={mergeStyles([
               Typography.textCenter,
               Typography.heading2,
               { marginBottom: 8 },
            ])}
         >
            Hurrey
         </Text>
         <Text
            textCenter
            style={mergeStyles([Typography.paragraph2, { marginBottom: 24 }])}
         >
            {route.params.text}
         </Text>

         <Button
            style={globalStyles.button}
            mode="contained"
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate(route.params.page)}
         >
            <Text
               style={mergeStyles([globalStyles.text, globalStyles.buttonText])}
            >
               Go Back
            </Text>
         </Button>
      </View>
   );
};
