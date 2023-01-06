import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Assets, Button, Colors, Image, Text, View,
} from 'react-native-ui-lib';

import { ClipboardID } from '../../components/common/ClipboardID';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { TripCardList } from './components/TripCardList/TripCardList';
import { ActionsBar } from '../../components/ActionsBar/ActionsBar';

import { useAppSelector } from '../../redux/hooks';

import { ITripCollectionItem } from '../../redux/tripsCollection/tripsCollection.model';

import { globalStyles } from '../../styles/global';
import { getActivatedTripCollectionItemSelector } from '../../redux/tripsCollection/tripsCollection';

export function Home() {
  const tripsCollection: ITripCollectionItem[] = useAppSelector(
    (store) => store.tripsCollection.trips,
  );

  const activatedTrip = useAppSelector(getActivatedTripCollectionItemSelector);

  const navigation = useNavigation();

  return (
    <MainWrapper headerTitle="Camping Trips">
      <ClipboardID />

      {tripsCollection.length === 0
        ? (
          <View center flex>
            <Image
              marginB-24
              source={Assets.graphic.trips}
              style={{
                width: 230,
                height: 180,
                resizeMode: 'contain',
              }}
            />
            <Text paragraph2 gray700>
              You didn’t add any trips before.
            </Text>
          </View>
        )
        : (
          <TripCardList />
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

      {tripsCollection.length && activatedTrip ? <ActionsBar /> : null}
    </MainWrapper>
  );
}
