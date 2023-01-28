import React, { useState } from 'react';

import { useRoute } from '@react-navigation/native';

import { Assets } from 'react-native-ui-lib';

import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { BackpackList } from './components/BackpackList/BackpackList';
import { AddBagItemDialog } from '../../components/AddBagItemDialog/AddBagItemDialog';

import { useCreateBagItemMutation, useGetActivatedTripQuery } from '../../redux/api/trip';

import { AssetsIconsType } from '../../matherialUI';

export function Backpack() {
  const [bagInputDialogVisible, setBagInputDialogVisible] = useState(false);

  const { name: screenName } = useRoute();

  const { data: activatedTrip } = useGetActivatedTripQuery();

  const [createBackpackItem] = useCreateBagItemMutation();

  const addBagItemCallback = (description: string) => {
    createBackpackItem({
      tripId: activatedTrip?._id as string,
      bagItem: {
        description,
        count: 1,
      },
    });
  };

  return (
    <MainWrapper
      headerTitle={screenName}
      iconRight={(Assets.icons as AssetsIconsType).plus}
      iconRightCallback={() => setBagInputDialogVisible(true)}
    >
      <BackpackList />

      <AddBagItemDialog
        {...{
          tripId: activatedTrip?._id as string,
          bagInputDialogVisible,
          setBagInputDialogVisible,
          addBagItemCallback,
        }}
      />

      <ActionsBar activeScreenName={screenName} />
    </MainWrapper>
  );
}
