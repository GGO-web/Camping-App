import React, { useCallback } from "react";
import { View } from "react-native";
import { FormikProps, useFormikContext } from "formik";

import { Button, Colors, Text } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";

import { globalStyles } from "../../../../styles/global";
import { ISignUp } from "../../SignUp.model";
import { authStyles } from "../../../../styles/auth";
import { useNavigation } from "@react-navigation/native";

export const SignUpForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ISignUp>;
}) => {
   const actions = useFormikContext();

   const navigation = useNavigation();

   return (
      <View>
         <View style={authStyles.formGroup}>
            <TextField
               label="Name"
               autoComplete="name"
               caretHidden={false}
               value={formik.values.username}
               onChangeText={formik.handleChange("username")}
               validationMessageStyle={globalStyles.validationMessage}
               labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
               fieldStyle={{
                  ...globalStyles.text,
                  ...globalStyles.input,
                  ...(formik.touched.username
                     ? formik.errors.username
                        ? globalStyles.isError
                        : globalStyles.isValid
                     : []),
               }}
               onChange={useCallback(() => {
                  formik.setFieldTouched("username", true, true);
               }, [formik.touched.username])}
               enableErrors={true}
               validateOnChange={true}
               validateOnBlur={true}
               onBlur={formik.handleBlur("username")}
               validate={[() => false]}
               validationMessage={[formik.errors.username]}
               style={
                  formik.errors.username
                     ? globalStyles.isError
                     : globalStyles.isValid
               }
            />
         </View>

         <View style={authStyles.formGroup}>
            <TextField
               label="Email"
               autoComplete="email"
               keyboardType="email-address"
               caretHidden={false}
               value={formik.values.email}
               onChangeText={formik.handleChange("email")}
               validationMessageStyle={globalStyles.validationMessage}
               labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
               autoCapitalize="none"
               fieldStyle={{
                  ...globalStyles.text,
                  ...globalStyles.input,
                  ...(formik.touched.email
                     ? formik.errors.email
                        ? globalStyles.isError
                        : globalStyles.isValid
                     : []),
               }}
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
               labelStyle={{ ...globalStyles.text, ...globalStyles.label }}
               autoCapitalize="none"
               fieldStyle={{
                  ...globalStyles.text,
                  ...globalStyles.input,
                  ...(formik.touched.password
                     ? formik.errors.password
                        ? globalStyles.isError
                        : globalStyles.isValid
                     : []),
               }}
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
            onPress={() => navigation.navigate("Login" as never)}
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
};
