import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Assets, Button, Colors, Text,
} from 'react-native-ui-lib';

import { RefreshControl, ScrollView } from 'react-native';
import { ClipboardID } from '../../components/common/ClipboardID';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TripCardList } from './components/TripCardList/TripCardList';
import { ActionsBar } from '../../components/ActionsBar/ActionsBar';

import { useGetAllTripsQuery, useLazyGetActivatedTripQuery } from '../../redux/api/trip';

import { AssetsIconsType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

import { ScreenNavigationProp } from '../../types';
import { ITripResponse } from '../../models/responses/TripResponse';
import { Loader } from '../../components/Loader/Loader';

export function Home() {
  const [fetching, setFetching] = React.useState(false);

  const { data: trips } = useGetAllTripsQuery();
  const [getActivatedTrip] = useLazyGetActivatedTripQuery();
  const [activatedTrip, setActivatedTrip] = useState<ITripResponse | undefined>(undefined);

  const navigation = useNavigation<ScreenNavigationProp>();

  const onRefresh = async () => {
    try {
      setFetching(true);
      const activatedTrip = await getActivatedTrip().unwrap();
      setActivatedTrip(activatedTrip);
    } catch (error) {
      setActivatedTrip(undefined);
    } finally {
      setFetching(false);
    }
  };

  if (fetching) {
    return <Loader message="Trips is fetching, please wait a second" />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.primary,
      }}
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
    }
    >
      <MainWrapper headerTitle="Camping Trips" iconRightCallback={() => navigation.navigate('Notifications')} iconRight={(Assets.icons as AssetsIconsType).bell}>
        <ClipboardID />

        <TripCardList trips={trips} activatedTrip={activatedTrip} />

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

        {activatedTrip ? <ActionsBar /> : null}
      </MainWrapper>
    </ScrollView>
  );
}
