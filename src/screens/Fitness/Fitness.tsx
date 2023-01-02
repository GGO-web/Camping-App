import React from 'react';

import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { FitnessStatus } from './components/FitnessStatus/FitnessStatus';
import { FitnessTrackers } from './components/FitnessTrackers/FitnessTrackers';

export function Fitness() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName}>
      <FitnessStatus />

      <FitnessTrackers />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
