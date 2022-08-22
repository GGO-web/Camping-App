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
            marginB-24
            style={globalStyles.imageCenter}
            source={require("../../../assets/hurrey.png")}
         ></Image>
         <Text marginB-8 textCenter heading2>
            Hurrey
         </Text>
         <Text marginB-24 textCenter paragraph2>
            {route.params?.text}
         </Text>

         <Button
            style={globalStyles.button}
            mode="contained"
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate(route.params?.page || "Login")}
         >
            <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
               Go Back
            </Text>
         </Button>
      </View>
   );
};
