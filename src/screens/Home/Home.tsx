import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Assets, Button, Colors, Image, Text, View,
} from 'react-native-ui-lib';

import { ClipboardID } from '../../components/common/ClipboardID';
import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { useAppSelector } from '../../redux/hooks';

import { globalStyles } from '../../styles/global';
import { HomeActions } from './components/HomeActions/HomeActions';

export function Home() {
  const tripPrepared = useAppSelector((store) => store.trip.completed);

  const navigation = useNavigation();

  return (
    <MainWrapper headerTitle="Camping Trips">

      {!tripPrepared ? (
        <>
          <ClipboardID />

          <View center flex>
            <Image marginB-24 source={Assets.graphic.trips} />
            <Text paragraph2 gray700>
              You didn’t add any trips before.
            </Text>
          </View>

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
        </>
      ) : (
        <HomeActions />
      )}
    </MainWrapper>
  );
}
