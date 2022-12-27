import React, { useState } from 'react';
import {
  Colors,
  View,
} from 'react-native-ui-lib';

import { HomeAction } from './HomeAction';

import { homeActionTabs } from '../../../../constants';
import { IActionTab } from '../../../../models/ActionsTab.model';

export function HomeActions() {
  const [actionsTabs, setActionsTabs] = useState(homeActionTabs);

  return (
    <View
      row
      spread
      absB
      paddingV-24
      paddingH-20
      paddingB-34
      style={{
        marginLeft: -20,
        marginRight: -20,
        bottom: -16,
        left: 0,
        right: 0,
        overflow: 'hidden',
        backgroundColor: Colors.primary,
      }}
    >
      {actionsTabs.map((actionTab: IActionTab) => (
        <HomeAction
          key={actionTab.id}
          textContent={actionTab.title}
          isActive={actionTab.active}
          iconSource={actionTab.icon}
          iconsStyles={actionTab.iconStyles}
        />
      ))}
    </View>
  );
}
