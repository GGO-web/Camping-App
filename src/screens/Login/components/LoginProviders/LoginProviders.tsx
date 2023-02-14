import React from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-ui-lib';

import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { useLoginWithFirebase } from '../../../../firebase/loginWithFirebase';
import { firebaseAuth } from '../../../../firebase/firebase';

import { loginProvidersStyles } from './LoginProvidersStyle';
import { globalStyles } from '../../../../styles/global';

import { ScreenNavigationProp } from '../../../../types';

export function LoginProviders({
  response,
  promptAsync,
  setIsLoading,
}: {
  response: any;
  promptAsync: any;
  setIsLoading: Function
}) {
  const loginWithFirebase = useLoginWithFirebase();

  const navigation = useNavigation<ScreenNavigationProp>();

  const loginWithGoogle = async () => {
    // Get the users ID token
    try {
      await firebaseAuth.signOut(); // if user is logged in before

      promptAsync();
    } catch (err: any) {
      // console.log(err.message);
    }
  };

  const providerRedirect = async () => {
    if (response?.type === 'success') {
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(
        response.authentication.id_token,
        response.params.access_token,
      );

      setIsLoading(true);

      // Sign-in the user with the credential
      await signInWithCredential(firebaseAuth, googleCredential);

      await loginWithFirebase();

      setIsLoading(false);

      navigation.navigate(
        'Hurrey',
        {
          page: 'Homepage',
          text: 'Your registration is successful. You will be automatically redirected to the homepage at the moment',
        },
      );
    }
  };

  React.useEffect(() => {
    providerRedirect();
  }, [response]);

  return (
    <View>
      <Text variant="bodyLarge" style={loginProvidersStyles.headline}>
        or continue with
      </Text>

      <View style={loginProvidersStyles.icons}>
        <TouchableOpacity
          style={{
            ...globalStyles.buttonOutlined,
            ...loginProvidersStyles.icon,
          }}
          activeOpacity={0.8}
          onPress={() => loginWithGoogle()}
        >
          <Image
            source={{
              width: 32,
              height: 32,
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
