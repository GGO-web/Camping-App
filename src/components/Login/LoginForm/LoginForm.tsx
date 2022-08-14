import React from "react";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { FormikProps, useFormikContext } from "formik";

import { ILogin } from "../Login.model";

import { loginFormStyles } from "./LoginFormStyles";
import { globalStyles, mergeStyles } from "../../../styles/global";

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
            <TextInput
               label={"Email"}
               autoComplete="email"
               keyboardType="email-address"
               onChangeText={formik.handleChange("email")}
               value={formik.values.email}
               placeholder="Your email"
               mode="outlined"
               error={!!formik.errors.email}
               style={mergeStyles([globalStyles.text, globalStyles.input])}
            />

            <HelperText
               type="error"
               padding="none"
               style={mergeStyles([
                  globalStyles.text,
                  loginFormStyles.inputHelperText,
               ])}
               visible={!!formik.errors.email}
            >
               {formik.errors.email}
            </HelperText>
         </View>

         <View style={loginFormStyles.formGroup}>
            <TextInput
               label="Password"
               onChangeText={formik.handleChange("password")}
               value={formik.values.password}
               placeholder="Your password"
               mode="outlined"
               secureTextEntry={true}
               error={!!formik.errors.password}
               style={mergeStyles([globalStyles.text, globalStyles.input])}
            />

            <HelperText
               type="error"
               padding="none"
               style={mergeStyles([
                  globalStyles.text,
                  loginFormStyles.inputHelperText,
               ])}
               visible={!!formik.errors.password}
            >
               {formik.errors.password}
            </HelperText>
         </View>

         <Button
            uppercase={false}
            style={globalStyles.button}
            mode="contained"
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
