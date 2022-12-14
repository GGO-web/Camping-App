import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Assets, Colors, View, Text,
} from 'react-native-ui-lib';

import { AddBagItemDialog } from '../../../../components/AddBagItemDialog/AddBagItemDialog';

import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { BagListItems } from './components/BagListItems/BagListItems';

import { useActions } from '../../../../hooks/actions';

import type { AssetsColorsType, AssetsIconsType } from '../../../../matherialUI';
import { useAppSelector } from '../../../../redux/hooks';

import { globalStyles } from '../../../../styles/global';

export function Bag() {
  const [bagInputDialogVisible, setBagInputDialogVisible] = useState(false);

  const navigation = useNavigation();

  const {
    addBagItem,
    addNewTripToCollection,
    clearTripFormInfo,
  } = useActions();

  const trip = useAppSelector((store) => store.trip);

  const prepareTripHandler = () => {
    // add trip into db and show main page with the trip info
    addNewTripToCollection(trip);
    clearTripFormInfo();

    navigation.navigate('Activities' as never);
  };

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
      <CrumbsLink
        style={{ marginBottom: 0 }}
        iconRight={(Assets.icons as AssetsIconsType).plus}
        iconRightStyles={{
          tintColor: (Colors as AssetsColorsType).dark,
          width: 21,
          height: 21,
          resizeMode: 'cover',
        }}
        onPressIconRight={() => setBagInputDialogVisible(true)}
      >
        <Text>Prepare your Bag</Text>
      </CrumbsLink>

      <View flex>
        <AddBagItemDialog
          {...{
            bagInputDialogVisible,
            setBagInputDialogVisible,
            addBagItemCallback: addBagItem,
          }}
        />

        <BagListItems />

        <ButtonPrimary
          buttonStyles={{
            position: 'absolute', bottom: 16, left: 0, right: 0,
          }}
          marginT-20
          buttonText="Ready"
          buttonCallback={prepareTripHandler}
        />
      </View>
    </View>

  );
}
