import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TeammatesList } from './components/TeammatesList/TeammatesList';

export function Teammates() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName}>
      <TeammatesList />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
