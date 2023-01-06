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

import { useAppSelector } from '../../redux/hooks';

import { ITripCollectionItem } from '../../redux/tripsCollection/tripsCollection.model';
import { getActivatedTripCollectionItemSelector } from '../../redux/tripsCollection/tripsCollection';

import { AssetsGraphicType } from '../../matherialUI';

import { globalStyles } from '../../styles/global';

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
          <NoResults
            image={(Assets.graphic as AssetsGraphicType).trips}
            text="You didn’t add any trips before."
          />
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
