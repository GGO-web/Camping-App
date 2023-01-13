import React from 'react';
import { View } from 'react-native';
import { Button, Colors, Text } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { FormikProps, useFormikContext } from 'formik';

import { Input } from '../../../../components/Input/Input';

import { ISignUp } from '../../SignUp.model';

import { globalStyles } from '../../../../styles/global';

export function SignUpForm({
  formSubmitHandler,
  formik,
}: {
  formSubmitHandler: Function;
  formik: FormikProps<ISignUp>;
}) {
  const actions = useFormikContext();

  const navigation = useNavigation();

  return (
    <View>
      <View style={globalStyles.formGroup}>
        <Input
          formik={formik}
          fieldName="username"
          label="Name"
          {...{ autoComplete: 'name', caretHidden: false }}
        />
      </View>

      <View style={globalStyles.formGroup}>
        <Input
          formik={formik}
          fieldName="email"
          label="Email"
          {...{
            autoComplete: 'email',
            keyboardType: 'email-address',
            caretHidden: false,
          }}
        />
      </View>

      <View style={globalStyles.formGroup}>
        <Input
          formik={formik}
          fieldName="password"
          label="Password"
          {...{
            secureTextEntry: true,
          }}
        />
      </View>

      <Button
        marginB-20
        style={globalStyles.button}
        mode="contained"
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.gray400}
        disabled={!formik.isValid}
        onPress={() => formSubmitHandler(formik.values, actions)}
      >
        <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
          Register
        </Text>
      </Button>

      <Button
        style={globalStyles.buttonOutlined}
        backgroundColor={Colors.primary}
        mode="outlined"
        onPress={() => navigation.navigate('Login' as never)}
      >
        <Text
          style={{
            ...globalStyles.text,
            ...globalStyles.buttonTextOutlined,
          }}
        >
          Login
        </Text>
      </Button>
    </View>
  );
}
