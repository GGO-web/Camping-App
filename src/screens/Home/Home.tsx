import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Assets, Button, Colors, Text,
} from 'react-native-ui-lib';

import { ClipboardID } from '../../components/common/ClipboardID';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TripCardList } from './components/TripCardList/TripCardList';
import { ActionsBar } from '../../components/ActionsBar/ActionsBar';

import { useGetActivatedTripQuery, useGetAllTripsQuery } from '../../redux/api/trip';

import { AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

import { ScreenNavigationProp } from '../../types';

export function Home() {
  const { data: trips } = useGetAllTripsQuery();
  const { data: activatedTrip, isError } = useGetActivatedTripQuery();

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <MainWrapper headerTitle="Camping Trips" iconRightCallback={() => navigation.navigate('Notifications')} iconRight={(Assets.icons as AssetsIconsType).bell}>
      <ClipboardID />

      <TripCardList trips={trips} activatedTrip={isError ? undefined : activatedTrip} />

      <Button
        marginB-16
        mode="contained"
        style={globalStyles.button}
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.gray400}
        onPress={() => navigation.navigate('NewTrip')}
      >
        <Text
          style={{
            ...globalStyles.text,
            ...globalStyles.buttonText,
          }}
        >
          Start New Trip
        </Text>
      </Button>

      {(activatedTrip && !isError) ? <ActionsBar /> : null}
    </MainWrapper>
  );
}
