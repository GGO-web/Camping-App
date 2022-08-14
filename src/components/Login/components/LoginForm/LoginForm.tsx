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
               fieldStyle={mergeStyles([globalStyles.text, globalStyles.input])}
               enableErrors={true}
               validate={["required", "email"]}
               validateOnChange={true}
               validationMessage={[
                  "Email is required",
                  "Something is missing. Please type a valid email",
               ]}
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
               fieldStyle={mergeStyles([globalStyles.text, globalStyles.input])}
               enableErrors={true}
               validate={["required", (value: string) => value.length > 6]}
               validateOnChange={true}
               validationMessage={[
                  "Password is required",
                  "Password is too weak",
               ]}
            />
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
