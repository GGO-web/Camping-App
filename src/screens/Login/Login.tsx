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
  const [formFeedbackModal, setFormFeedbackModal] = useState({
    visible: false,
    text: '',
  });

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
      await signInWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );

      setIsLoading(true);

      await loginWithFirebase();

      setIsLoading(false);
    } catch (error: any) {
      let feedbackErrorMessage = error.message;

      if (error instanceof FirebaseError) {
        // firebase errors validation
        switch (true) {
          case error.message.includes('auth/invalid-email'):
            feedbackErrorMessage = 'The email address is not valid.';
            actions.setFieldError('email', feedbackErrorMessage);
            break;
          case error.message.includes('auth/user-disabled'):
            feedbackErrorMessage = 'The user is disabled.';
            actions.setFieldError('email', feedbackErrorMessage);
            break;
          case error.message.includes('auth/user-not-found'):
            feedbackErrorMessage = 'The user with the given email is not found.';
            actions.setFieldError('email', feedbackErrorMessage);
            break;
          case error.message.includes('auth/wrong-password'):
            feedbackErrorMessage = 'The password is invalid.';
            actions.setFieldError('password', feedbackErrorMessage);
            break;
          default:
            break;
        }
      }

      setFormFeedbackModal({
        visible: true,
        text: feedbackErrorMessage,
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Loader message="We are processing your data, please hold on a minute" />
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
                formik={formik}
              />
            )}
          </Formik>

          <LoginProviders {...{
            response, promptAsync, isLoading, setIsLoading,
          }}
          />
        </View>

        <Toast
          visible={formFeedbackModal.visible}
          position="bottom"
          autoDismiss={3000}
          onDismiss={() => setFormFeedbackModal({ ...formFeedbackModal, visible: false })}
        >
          <Text style={{ ...globalStyles.text, ...authStyles.feedback }}>
            {formFeedbackModal.text}
          </Text>
        </Toast>
      </View>
    </KeyboardAvoidingView>
  );
}
