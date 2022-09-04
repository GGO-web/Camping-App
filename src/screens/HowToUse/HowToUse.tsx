import React from "react";
import { ScrollView } from "react-native";
import {
   Badge,
   Colors,
   ListItem,
   Text,
   Typography,
   View,
} from "react-native-ui-lib";

import { MainWrapper } from "../../components/MainWrapper/MainWrapper";

export const HowToUse = () => {
   const rules: { title: string; text: string }[] = [
      {
         title: "Make a Trip",
         text: "By pressing “start new trip” button you’ll be able to make fill a form which will help you to set up your....",
      },
      {
         title: "Add Location",
         text: "This app have a great feature which allows you to discover the top locations around the world and le....",
      },
      {
         title: "Add Teammates",
         text: "If you previously added teammates they will show in the list. but is you didn’t do that you need to add n....",
      },
      {
         title: "Now you’re Ready",
         text: "To begin your adventure with your Camping App which will helps you to set your targets. know what be....",
      },
   ];

   const renderItem = (
      item: { title: string; text: string },
      index: number
   ) => {
      return (
         <ListItem
            key={index}
            activeOpacity={0.8}
            backgroundColor={Colors.primary50}
            style={{ borderRadius: 16 }}
            padding-16
            marginB-24
         >
            <ListItem.Part left marginR-16>
               <Badge
                  backgroundColor={Colors.primary100}
                  borderRadius={16}
                  customElement={
                     <Text
                        style={{
                           ...Typography.heading3,
                           ...{ color: Colors.primary900 },
                        }}
                     >
                        {1 + index}
                     </Text>
                  }
                  size={48}
               />
            </ListItem.Part>

            <ListItem.Part flex column>
               <Text paragraph3 primary900>
                  {item.title}
               </Text>

               <Text
                  numberOfLines={3}
                  style={{ maxWidth: 220 }}
                  paragraph3
                  primary700
               >
                  {item.text}
               </Text>
            </ListItem.Part>
         </ListItem>
      );
   };

   return (
      <MainWrapper headerTitle="How To Use">
         <ScrollView>
            {rules.map((item, index) => renderItem(item, index))}
         </ScrollView>
      </MainWrapper>
   );
};
