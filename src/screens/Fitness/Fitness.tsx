import React from 'react';
import { Assets, Text } from 'react-native-ui-lib';

import { useRoute } from '@react-navigation/native';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

import { AssetsIconsType } from '../../matherialUI';

export function Fitness() {
  const { name: screenName } = useRoute();

  return (
    <MainWrapper headerTitle={screenName} iconRight={(Assets.icons as AssetsIconsType).refresh}>
      <Text>Fitness progress</Text>

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
