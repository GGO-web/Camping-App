import React, { useCallback } from "react";
import { View } from "react-native";
import { FormikProps, useFormikContext } from "formik";

import { Button, Colors, Text } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";

import { ILogin } from "../../Login.model";

import { globalStyles, mergeStyles } from "../../../../styles/global";
import { authStyles } from "../../../../styles/auth";

export const LoginForm = ({
   formSubmitHandler,
   formik,
   navigation,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ILogin>;
   navigation: any;
}) => {
   const actions = useFormikContext();

   return (
      <View>
         <View style={authStyles.formGroup}>
            <TextField
               label="Email"
               autoComplete="email"
               keyboardType="email-address"
               caretHidden={false}
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
               onChange={useCallback(() => {
                  formik.setFieldTouched("email", true, true);
               }, [formik.touched.email])}
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

         <View style={authStyles.formGroup}>
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
               onChange={useCallback(
                  () => formik.setFieldTouched("password", true, true),
                  [formik.touched.password]
               )}
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
            style={mergeStyles([globalStyles.button, { marginBottom: 20 }])}
            mode="contained"
            backgroundColor={Colors.primary}
            disabledBackgroundColor={Colors.gray400}
            disabled={!formik.isValid}
            onPress={() => formSubmitHandler(formik.values, actions)}
         >
            <Text
               style={mergeStyles([globalStyles.text, globalStyles.buttonText])}
            >
               Log In
            </Text>
         </Button>

         <Button
            style={globalStyles.buttonOutlined}
            backgroundColor={Colors.primary}
            mode="outlined"
            onPress={() => navigation.navigate("SignUp")}
         >
            <Text
               style={mergeStyles([
                  globalStyles.text,
                  globalStyles.buttonTextOutlined,
               ])}
            >
               Register
            </Text>
         </Button>
      </View>
   );
};
