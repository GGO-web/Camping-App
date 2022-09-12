import React from "react";
import { Button, Colors, Text, View } from "react-native-ui-lib";
import { FormikProps, useFormikContext } from "formik";

import { Input } from "../../../../components/Input/Input";

import { IResetPassword } from "../../ResetPassword";

import { globalStyles } from "../../../../styles/global";

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
         <View style={globalStyles.formGroup}>
            <Input
               formik={formik}
               fieldName="email"
               label="Email"
               {...{
                  autoComplete: "email",
                  keyboardType: "email-address",
                  caretHidden: false,
               }}
            ></Input>
         </View>

         <Button
            style={globalStyles.button}
            mode="contained"
            backgroundColor={Colors.primary}
            disabledBackgroundColor={Colors.gray400}
            disabled={!formik.isValid}
            onPress={() => formSubmitHandler(formik.values, actions)}
         >
            <Text style={{ ...globalStyles.text, ...globalStyles.buttonText }}>
               Reset
            </Text>
         </Button>
      </View>
   );
};
