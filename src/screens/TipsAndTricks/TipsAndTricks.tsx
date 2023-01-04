import React from 'react';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TipsAndTricksList } from './components/TipsAndTricksList';

export function TipsAndTricks() {
  return (
    <MainWrapper headerTitle="Tips & Tricks">
      <TipsAndTricksList />
    </MainWrapper>
  );
}
