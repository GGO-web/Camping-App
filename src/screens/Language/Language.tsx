import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Assets, Checkbox, Colors, Text, View,
} from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { initialLanguage, languagesList } from '../../constants';

function getLanguagesState(initial: Object) {
  return languagesList.reduce((prev, item) => {
    if (item in prev) {
      return prev;
    }

    return { ...prev, [item]: false };
  }, initial);
}

export function Language() {
  const [checkboxStates, setCheckboxStates]: [{ [key: string]: any }, Function] = useState(
    getLanguagesState(initialLanguage),
  );

  return (
    <MainWrapper headerTitle="Language">
      <ScrollView>
        {languagesList.map((language: string) => (
          <View row centerV spread key={language} marginB-24>
            <Text>{language}</Text>
            <Checkbox
              outline={Colors.primary}
              value={checkboxStates[language]}
              iconColor={Colors.white}
              iconSouce={Assets.icons.checkmark}
              containerStyle={{
                backgroundColor: checkboxStates[language]
                  ? Colors.primary500
                  : 'transparent',
              }}
              onValueChange={() => {
                if (!checkboxStates[language]) {
                  setCheckboxStates(
                    getLanguagesState({ [language]: true }),
                  );
                }
              }}
            />
          </View>
        ))}
      </ScrollView>
    </MainWrapper>
  );
}
