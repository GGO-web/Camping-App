import React from 'react';
import {
  Button, Colors, Text,
} from 'react-native-ui-lib';

import { firebaseAuth } from '../../firebase/firebase';

import { MainWrapper } from '../../components/MainWrapper/MainWrapper';

export function Logout() {
  const logoutHandler = async () => {
    await firebaseAuth.signOut();
  };

  return (
    <MainWrapper headerTitle="Log-out">
      <Text paragraph2 textMuted marginB-24>
        Logging out will remove your access from this device. And clean your
        past data. are you still sure want to log-out?
      </Text>

      <Button backgroundColor={Colors.red} onPress={() => logoutHandler()}>
        <Text white paragraph3>
          Log out
        </Text>
      </Button>
    </MainWrapper>
  );
}
