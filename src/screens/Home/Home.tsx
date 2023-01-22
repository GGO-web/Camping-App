import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Assets, Button, Colors, Text,
} from 'react-native-ui-lib';

import { ClipboardID } from '../../components/common/ClipboardID';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TripCardList } from './components/TripCardList/TripCardList';
import { ActionsBar } from '../../components/ActionsBar/ActionsBar';
import { NoResults } from '../../components/common/NoResults';

import { AssetsGraphicType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';
import { useGetActivatedTripQuery, useGetAllTripsQuery } from '../../redux/api/trip';
import { Loader } from '../../components/Loader/Loader';

export function Home() {
  const { data: trips, isLoading } = useGetAllTripsQuery();
  const { data: activatedTrip } = useGetActivatedTripQuery();

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <MainWrapper headerTitle="Camping Trips">
      <ClipboardID />

      {!trips?.length
        ? (
          <NoResults
            image={(Assets.graphic as AssetsGraphicType).trips}
            text="You didn’t add any trips before."
          />
        )
        : (
          <TripCardList trips={trips} />
        )}

      <Button
        marginB-16
        mode="contained"
        style={globalStyles.button}
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.gray400}
        onPress={() => navigation.navigate('NewTrip' as never)}
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

      {trips?.length && activatedTrip ? <ActionsBar /> : null}
    </MainWrapper>
  );
}
