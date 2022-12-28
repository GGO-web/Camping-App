import React from 'react';
import { Text } from 'react-native-ui-lib';
import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

export function Backpack() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName}>
      <Text>Backpack items list</Text>

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
