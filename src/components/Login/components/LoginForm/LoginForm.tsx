import React from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { FormikProps, useFormikContext } from "formik";

import { ILogin } from "../../Login.model";

import { loginFormStyles } from "./LoginFormStyles";

import { globalStyles, mergeStyles } from "../../../../styles/global";
import { TextField } from "react-native-ui-lib/src/incubator";

export const LoginForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ILogin>;
}) => {
   const actions = useFormikContext();

   return (
      <View>
         <View style={loginFormStyles.formGroup}>
            <TextField
               label="Email"
               autoComplete="email"
               keyboardType="email-address"
               value={formik.values.email}
               onChangeText={formik.handleChange("email")}
               validationMessageStyle={globalStyles.validationMessage}
               labelStyle={mergeStyles([globalStyles.text, globalStyles.label])}
               autoCapitalize="none"
               fieldStyle={mergeStyles([
                  globalStyles.text,
                  globalStyles.input,
                  formik.touched.email
                     ? formik.errors.email
                        ? globalStyles.isError
                        : globalStyles.isValid
                     : null,
               ])}
               enableErrors={true}
               validateOnChange={true}
               validateOnBlur={true}
               onBlur={formik.handleBlur("email")}
               validate={[() => false]}
               validationMessage={[formik.errors.email]}
               style={
                  formik.errors.email
                     ? globalStyles.isError
                     : globalStyles.isValid
               }
            />
         </View>

         <View style={loginFormStyles.formGroup}>
            <TextField
               label="Password"
               secureTextEntry={true}
               onChangeText={formik.handleChange("password")}
               value={formik.values.password}
               validationMessageStyle={globalStyles.validationMessage}
               labelStyle={mergeStyles([globalStyles.text, globalStyles.label])}
               autoCapitalize="none"
               fieldStyle={mergeStyles([
                  globalStyles.text,
                  globalStyles.input,
                  formik.touched.password
                     ? formik.errors.password
                        ? globalStyles.isError
                        : globalStyles.isValid
                     : null,
               ])}
               enableErrors={true}
               validateOnChange={true}
               validateOnBlur={true}
               onBlur={formik.handleBlur("password")}
               validate={[() => false]}
               validationMessage={[formik.errors.password]}
               style={
                  formik.errors.password
                     ? globalStyles.isError
                     : globalStyles.isValid
               }
            />
         </View>

         <Button
            uppercase={false}
            style={globalStyles.button}
            mode="contained"
            disabled={!formik.isValid}
            onPress={() => formSubmitHandler(formik.values, actions)}
         >
            <Text
               style={mergeStyles([globalStyles.text, globalStyles.buttonText])}
            >
               Log In
            </Text>
         </Button>
      </View>
   );
};
