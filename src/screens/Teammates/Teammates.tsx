import React from 'react';
import { Text } from 'react-native-ui-lib';
import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

export function Teammates() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName}>
      <Text>Teammates list</Text>

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
