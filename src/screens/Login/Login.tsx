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
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { firebaseAuth } from '../../firebase/firebase';

import { useAppDispatch } from '../../redux/hooks';
import { signIn } from '../../redux/userConfig/userSlice';
import { IUser } from '../../redux/userConfig/user.model';

import { ILogin } from './Login.model';

import { LoginForm } from './components/LoginForm/LoginForm';
import { LoginProviders } from './components/LoginProviders/LoginProviders';

import { globalStyles } from '../../styles/global';
import { authStyles } from '../../styles/auth';

import { authConfig } from '../../constants';
import { loginSchema } from '../../helpers/validationSchema';

export function Login() {
  const [formFeedbackModal, setFormFeedbackModal] = useState(false);

  const formInitialValues: ILogin = {
    email: '',
    password: '',
  };

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [, response, promptAsync]: any = Google.useAuthRequest(authConfig);

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

      const user: User = firebaseAuth.currentUser as User;

      dispatch(
        signIn({
          email: user.email,
          fullname: user.displayName,
          avatar: user.photoURL,
        } as IUser),
      );
      navigation.navigate('Homepage' as never);
    } catch (error: any) {
      const fireError = error as FirebaseError;

      // firebase errors validation
      if (fireError.message.includes('wrong-password')) {
        actions.setFieldError('password', 'The entered password is wrong.');
      } else if (
        fireError.message.includes('user-not-found')
            || fireError.message.includes('invalid-email')
      ) {
        actions.setFieldError(
          'email',
          'The user with the given email is not found.',
        );
      } else {
        setFormFeedbackModal(true);
      }
    }
  };

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
              navigation.navigate('Onboarding' as never);
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
