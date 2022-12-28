import React from 'react';
import {
  Colors,
  View,
} from 'react-native-ui-lib';

import { actionTabs } from '../../constants';
import { IActionTab } from '../../models/ActionsTab.model';
import { ActionsTab } from './ActionTab';

export function ActionsBar({ activeScreenName }: { activeScreenName: string }) {
  const actionsTabs = actionTabs.map((actionTab: IActionTab) => (
    actionTab.title === activeScreenName ? ({
      ...actionTab,
      active: true,
    }) : ({
      ...actionTab,
      active: false,
    })
  ));

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
        <ActionsTab
          key={actionTab.id}
          title={actionTab.title}
          isActive={actionTab.active}
          iconSource={actionTab.icon}
          iconsStyles={actionTab.iconStyles}
        />
      ))}
    </View>
  );
}
