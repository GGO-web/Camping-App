import React from 'react';
import { Assets, Text } from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { AssetsIconsType } from '../../matherialUI';

export function Activities() {
  return (
    <MainWrapper headerTitle="Activities" iconRight={(Assets.icons as AssetsIconsType).plus}>
      <Text>Activities tasks</Text>
    </MainWrapper>
  );
}
