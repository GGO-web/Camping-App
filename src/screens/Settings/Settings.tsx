import React from 'react';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { SettingsControls } from './SettingsControls/SettingsControls';

export function Settings() {
  return (
    <MainWrapper headerTitle="Settings">
      <SettingsControls />
    </MainWrapper>
  );
}
