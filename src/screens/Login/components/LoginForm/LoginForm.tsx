import React, { useCallback } from "react";
import { View } from "react-native";
import { FormikProps, useFormikContext } from "formik";

import { Button, Colors, Text, Typography } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";
import { Link, useNavigation } from "@react-navigation/native";

import { ILogin } from "../../Login.model";

import { globalStyles } from "../../../../styles/global";
import { authStyles } from "../../../../styles/auth";
import { Input } from "../../../../components/Input/Input";

export const LoginForm = ({
   formSubmitHandler,
   formik,
}: {
   formSubmitHandler: Function;
   formik: FormikProps<ILogin>;
}) => {
   const actions = useFormikContext();

   const navigation = useNavigation();

   return (
      <View>
         <View style={authStyles.formGroup}>
            <Input formik={formik} fieldName="email" label="Email"></Input>
         </View>

         <View style={authStyles.formGroup}>
            <Input
               formik={formik}
               fieldName="password"
               label="Password"
               {...{ secureTextEntry: true }}
            ></Input>
         </View>

         <Link
            style={{
               ...Typography.paragraph2,
               ...Typography.textCenter,
               ...Typography.textMuted,
               ...{ marginBottom: 24 },
            }}
            to={{ screen: "ResetPassword" }}
         >
            Forgot Password?
         </Link>

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
               Log In
            </Text>
         </Button>

         <Button
            style={globalStyles.buttonOutlined}
            backgroundColor={Colors.primary}
            mode="outlined"
            onPress={() => navigation.navigate("SignUp" as never)}
         >
            <Text
               style={{
                  ...globalStyles.text,
                  ...globalStyles.buttonTextOutlined,
               }}
            >
               Register
            </Text>
         </Button>
      </View>
   );
};
