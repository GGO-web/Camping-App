import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Google from 'expo-auth-session/providers/google';

import { Formik, FormikHelpers } from 'formik';

import { Toast } from 'react-native-ui-lib/src/incubator';
import {
  Text, TouchableOpacity, View, Image,
} from 'react-native-ui-lib';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase';

import { LoginProviders } from '../Login/components/LoginProviders/LoginProviders';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

import { ISignUp } from './SignUp.model';

import { authConfig } from '../../constants';
import { signUpSchema } from '../../helpers/validationSchema';

import { globalStyles } from '../../styles/global';
import { authStyles } from '../../styles/auth';

import { ScreenNavigationProp } from '../../types';
import { Loader } from '../../components/Loader/Loader';

export function SignUp() {
  const [formFeedbackModal, setFormFeedbackModal] = useState({
    visible: false,
    text: '',
  });

  const formInitialValues: ISignUp = {
    username: '',
    email: '',
    password: '',
  };

  const navigation = useNavigation<ScreenNavigationProp>();

  const [, response, promptAsync]: any = Google.useAuthRequest(authConfig);

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (
    values: ISignUp,
    actions: FormikHelpers<ISignUp>,
  ) => {
    try {
      setIsLoading(true);

      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        values.email,
        values.password,
      );

      await updateProfile(result.user, {
        displayName: values.username,
      });

      setIsLoading(false);

      navigation.navigate(
        'Hurrey',
        {
          page: 'Homepage',
          text: 'Your registration is successful. You will be automatically redirected to the homepage at the moment',
        },
      );

      actions.resetForm();
    } catch (error: any) {
      let feedbackErrorMessage = error.message;

      if (error instanceof FirebaseError) {
        // firebase errors validation
        switch (true) {
          case error.message.includes('auth/email-already-in-use'):
            feedbackErrorMessage = 'The given email is already in use';
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
    }
  };

  if (isLoading) {
    return (
      <Loader
        message="Registration is in progress, please wait a second..."
      />
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
            onSubmit={(values: ISignUp, actions) => {
              formSubmitHandler(values, actions);
            }}
            validationSchema={signUpSchema}
            validateOnMount
          >
            {(formik) => (
              <SignUpForm
                formSubmitHandler={formSubmitHandler}
                formik={formik}
              />
            )}
          </Formik>

          <LoginProviders
            setIsLoading={setIsLoading}
            response={response}
            promptAsync={promptAsync}
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
