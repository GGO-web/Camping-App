import React, { useCallback } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";
import { FormikProps, useFormikContext } from "formik";

import { IResetPassword } from "../../ResetPassword";

import { globalStyles, mergeStyles } from "../../../../styles/global";
import { authStyles } from "../../../../styles/auth";

export const ResetPasswordForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<IResetPassword>;
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

         <Button
            style={globalStyles.button}
            backgroundColor={Colors.primary}
            onPress={() => formSubmitHandler(formik.values, actions)}
         >
            <Text
               style={mergeStyles([globalStyles.text, globalStyles.buttonText])}
            >
               Reset
            </Text>
         </Button>
      </View>
   );
};
