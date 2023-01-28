import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';

import { useNavigation } from '@react-navigation/native';

import { Formik, FormikHelpers } from 'formik';

import { Toast } from 'react-native-ui-lib/src/incubator';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native-ui-lib';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase';

import { ILogin } from './Login.model';

import { LoginForm } from './components/LoginForm/LoginForm';
import { LoginProviders } from './components/LoginProviders/LoginProviders';
import { Loader } from '../../components/Loader/Loader';

import { useLoginWithFirebase } from '../../firebase/loginWithFirebase';
import { loginSchema } from '../../helpers/validationSchema';
import { authConfig } from '../../constants';

import { globalStyles } from '../../styles/global';
import { authStyles } from '../../styles/auth';

import { ScreenNavigationProp } from '../../types';

export function Login() {
  const [formFeedbackModal, setFormFeedbackModal] = useState(false);

  const formInitialValues: ILogin = {
    email: '',
    password: '',
  };

  const navigation = useNavigation<ScreenNavigationProp>();

  const [, response, promptAsync]: any = Google.useAuthRequest(authConfig);

  const loginWithFirebase = useLoginWithFirebase();

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (
    values: ILogin,
    actions: FormikHelpers<ILogin>,
  ) => {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );

      await loginWithFirebase();

      setIsLoading(false);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        // firebase errors validation
        if (error.message.includes('wrong-password')) {
          actions.setFieldError('password', 'The entered password is wrong.');
        } else if (
          error.message.includes('user-not-found')
            || error.message.includes('invalid-email')
        ) {
          actions.setFieldError(
            'email',
            'The user with the given email is not found.',
          );
        } else {
          setFormFeedbackModal(true);
        }
      } else {
        setFormFeedbackModal(true);
      }
    }
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <KeyboardAvoidingView
      enabled={false}
      behavior="height"
      style={{ flex: 1 }}
    >
      <View style={authStyles.wrapper}>
        <View style={authStyles.form}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={authStyles.logoWrapper}
            onPress={() => {
              navigation.navigate('Onboarding');
            }}
          >
            <Image
              style={authStyles.logo}
              source={require('../../../assets/logo.png')}
            />
          </TouchableOpacity>

          <Formik
            initialValues={formInitialValues}
            onSubmit={(values: ILogin, actions) => {
              formSubmitHandler(values, actions);
            }}
            validationSchema={loginSchema}
            validateOnMount
          >
            {(formik) => (
              <LoginForm
                formSubmitHandler={formSubmitHandler}
                formik={formik}
              />
            )}
          </Formik>

          <LoginProviders {...{ response, promptAsync }} />
        </View>

        <Toast
          visible={formFeedbackModal}
          position="bottom"
          autoDismiss={3000}
          onDismiss={() => setFormFeedbackModal(false)}
        >
          <Text style={{ ...globalStyles.text, ...authStyles.feedback }}>
            Ooops something went wrong. Please try again
          </Text>
        </Toast>
      </View>
    </KeyboardAvoidingView>
  );
}
