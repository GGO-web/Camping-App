import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Assets, Colors, View, Text,
} from 'react-native-ui-lib';

import { v4 } from 'uuid';

import { AddBagItemDialog } from '../../../../components/AddBagItemDialog/AddBagItemDialog';
import { ButtonPrimary } from '../../../../components/Buttons/ButtonPrimary';
import { CrumbsLink } from '../../../../components/common/CrumbsLink';
import { BagListItems } from './components/BagListItems/BagListItems';

import { useActions } from '../../../../hooks/actions';
import { useAppSelector } from '../../../../redux/hooks';
import { useCompleteTripMutation, useCreateTripMutation } from '../../../../redux/api/trip';

import type { AssetsColorsType, AssetsIconsType } from '../../../../matherialUI';

import { globalStyles } from '../../../../styles/global';

import { ScreenNavigationProp } from '../../../../types';

import { ITrip } from '../../../../models/Trip.model';

export function Bag() {
  const [bagInputDialogVisible, setBagInputDialogVisible] = useState(false);

  const navigation = useNavigation<ScreenNavigationProp>();

  const {
    addBagItem,
    clearTripFormInfo,
  } = useActions();

  const trip = useAppSelector((store) => store.trip);

  const [createTrip] = useCreateTripMutation();
  const [completeTrip] = useCompleteTripMutation();

  const prepareTripHandler = async () => {
    // filter checked items
    const newTrip: Omit<ITrip, 'latestLocationsList' | 'latestLocation'> = {
      tripName: trip.tripName,
      teammates: trip.teammates.map((teammate) => teammate.uid), // string of teammates ids
      tripPeriod: trip.tripPeriod,
      bagItems: trip.bagItems.filter((bagItem) => bagItem.checked),
      locations: trip.selectedLocations.map((location) => ({
        id: location.id,
        name: location.name,
        description: location.description,
        images: location.images,
        addresses: location.addresses,
      })),
    };

    // create trip in DB, complete & activate it
    await createTrip(newTrip).unwrap();

    await completeTrip().unwrap();

    clearTripFormInfo();

    navigation.navigate('Activities');
  };

  const addBagItemCallback = (description: string) => {
    addBagItem({
      id: v4(),
      description,
      count: 1,
      checked: true,
    });
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
            addBagItemCallback,
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
