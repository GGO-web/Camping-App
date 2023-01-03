import React from 'react';

import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { BackpackList } from './components/BackpackList/BackpackList';

export function Backpack() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName}>
      <BackpackList />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
