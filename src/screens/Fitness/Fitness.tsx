import React from 'react';
import { Assets } from 'react-native-ui-lib';

import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { AssetsIconsType } from '../../matherialUI';
import { FitnessStatus } from './components/FitnessStatus/FitnessStatus';
import { FitnessTrackers } from './components/FitnessTrackers/FitnessTrackers';

export function Fitness() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName} iconRight={(Assets.icons as AssetsIconsType).refresh}>
      <FitnessStatus />

      <FitnessTrackers />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
