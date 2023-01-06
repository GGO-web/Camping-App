import React, { useState } from 'react';

import { useRoute } from '@react-navigation/native';

import { Assets } from 'react-native-ui-lib';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { BackpackList } from './components/BackpackList/BackpackList';
import { AddBagItemDialog } from '../../components/AddBagItemDialog/AddBagItemDialog';

import { AssetsIconsType } from '../../matherialUI';
import { useActions } from '../../hooks/actions';

export function Backpack() {
  const [bagInputDialogVisible, setBagInputDialogVisible] = useState(false);

  const { name: screenName } = useRoute();

  const { addBackpackItem } = useActions();

  return (
    <MainWrapper
      headerTitle={screenName}
      iconRight={(Assets.icons as AssetsIconsType).plus}
      iconRightCallback={() => setBagInputDialogVisible(true)}
    >
      <BackpackList />

      <AddBagItemDialog
        {...{
          bagInputDialogVisible,
          setBagInputDialogVisible,
          addBagItemCallback: addBackpackItem,
        }}
      />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
