import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Assets, Checkbox, Colors, Text, View } from "react-native-ui-lib";

import { MainWrapper } from "../../components/MainWrapper/MainWrapper";

import { initialLanguage, languagesList } from "../../constants";

// TODO: add new reducer to control the language state & dispatch action when state is changed

export const Language = () => {
   const [checkboxStates, setCheckboxStates]: [Object, Function] = useState(
      getLanguagesState(initialLanguage)
   );

   function getLanguagesState(initial: Object) {
      return languagesList.reduce((prev, item) => {
         if (item in prev) {
            return prev;
         }

         return { ...prev, [item]: false };
      }, initial);
   }

   return (
      <MainWrapper headerTitle="Language">
         <ScrollView>
            {languagesList.map((language: string, index: number) => {
               return (
                  <View row centerV spread key={index} marginB-24>
                     <Text>{language}</Text>
                     <Checkbox
                        outline={Colors.primary}
                        value={checkboxStates[language as never]}
                        iconColor={Colors.white}
                        iconSouce={Assets.icons.checkmark}
                        containerStyle={{
                           backgroundColor: checkboxStates[language as never]
                              ? Colors.primary500
                              : "transparent",
                        }}
                        onValueChange={() => {
                           if (!checkboxStates[language as never]) {
                              setCheckboxStates(
                                 getLanguagesState({ [language]: true })
                              );
                           }
                        }}
                     ></Checkbox>
                  </View>
               );
            })}
         </ScrollView>
      </MainWrapper>
   );
};
