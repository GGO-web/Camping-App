import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Colors, Text } from 'react-native-ui-lib';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';
import { ButtonPrimary } from '../../components/Buttons/ButtonPrimary';

import { useDeactivateTripMutation } from '../../redux/api/trip';

import { ScreenNavigationProp } from '../../types';

export function ExitTrip() {
  const navigation = useNavigation<ScreenNavigationProp>();

  const [deactivateTrip] = useDeactivateTripMutation();

  const exitTripCallback = () => {
    deactivateTrip();

    navigation.navigate('Homepage');
  };

  return (
    <MainWrapper headerTitle="Exit Trip">
      <Text paragraph2 marginB-20 gray500>
        Exiting the trip will notify all your team members that you are leaving,
        and you can join the trips that you have any time you want. Do you want
        to exit and go to the home page?
      </Text>

      <ButtonPrimary
        buttonText="Exit Anyway"
        buttonStyles={{
          backgroundColor: Colors.red,
        }}
        buttonCallback={() => exitTripCallback()}
      />
    </MainWrapper>
  );
}
