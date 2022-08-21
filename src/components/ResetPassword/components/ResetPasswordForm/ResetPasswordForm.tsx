import { FormikProps, useFormikContext } from "formik";
import React, { useCallback } from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";
import { authStyles } from "../../../../styles/auth";
import { globalStyles, mergeStyles } from "../../../../styles/global";
import { IResetPassword } from "../../ResetPassword";

export const ResetPasswordForm = ({
   formSubmitHandler,
   formik,
   navigation,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<IResetPassword>;
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

         <Button
            style={globalStyles.button}
            backgroundColor={Colors.primary}
            onPress={() => navigation.navigate("Login")}
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
