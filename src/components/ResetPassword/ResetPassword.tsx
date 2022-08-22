import React, { useState } from "react";

import { Button, Icon, Text, Toast, View } from "react-native-ui-lib";

import { globalStyles, mergeStyles } from "../../styles/global";
import { Formik, FormikHelpers } from "formik";

import * as Yup from "yup";
import { FirebaseError } from "firebase/app";
import { ResetPasswordForm } from "./components/ResetPasswordForm/ResetPasswordForm";
import { authStyles } from "../../styles/auth";
import {
   ActionCodeSettings,
   confirmPasswordReset,
   sendPasswordResetEmail,
} from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { v4 as uuidv4 } from "uuid";

export const resetPasswordSchema = Yup.object().shape({
   email: Yup.string()
      .email("Something is missing. please type a valid email")
      .required("Email is required"),
});

export interface IResetPassword {
   email: string;
}

export const ResetPassword = ({ navigation }: { navigation: any }) => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: IResetPassword = {
      email: "",
   };

   const formSubmitHandler = async (
      values: { email: string },
      actions: FormikHelpers<{ email: string }>
   ) => {
      try {
         await sendPasswordResetEmail(firebaseAuth, values.email);

         navigation.navigate("Hurrey", {
            page: "Login",
            text: "Password reset link sent! Go to your email and follow the link",
         });
      } catch (error: any) {
         const fireError = error as FirebaseError;

         // firebase errors validation
         if (
            fireError.message.includes("user-not-found") ||
            fireError.message.includes("invalid-email")
         ) {
            actions.setFieldError(
               "email",
               "The user with the given email is not found."
            );
         } else if (fireError.message.includes("email-already-in-use")) {
            actions.setFieldError("email", "The given email is already in use");
         } else {
            setFormFeedbackModal(true);
         }
      }
   };

   return (
      <View
         style={mergeStyles([
            globalStyles.container,
            globalStyles.navcontainer,
         ])}
      >
         <Button
            left
            marginV-25
            onPress={() => navigation.goBack()}
            centerV
            backgroundColor="transparent"
         >
            <Icon
               marginR-8
               width={32}
               height={32}
               assetName="chevron_left"
            ></Icon>

            <Text mrAuto>Forgot Password</Text>
         </Button>

         <Text paragraph2 textMuted marginB-24>
            To get your new password you need to put your email address down
            below. and we will send you an confirmation letter on that for
            confirmation.
         </Text>

         <Formik
            initialValues={formInitialValues}
            onSubmit={(values: IResetPassword, actions) => {
               formSubmitHandler(values, actions);
            }}
            validationSchema={resetPasswordSchema}
            validateOnMount={true}
         >
            {(formik) => (
               <ResetPasswordForm
                  formSubmitHandler={formSubmitHandler}
                  formik={formik}
               ></ResetPasswordForm>
            )}
         </Formik>

         <Toast
            visible={formFeedbackModal}
            position={"bottom"}
            autoDismiss={3000}
            onDismiss={() => setFormFeedbackModal(false)}
         >
            <Text style={mergeStyles([globalStyles.text, authStyles.feedback])}>
               Ooops something went wrong. Please try again
            </Text>
         </Toast>
      </View>
   );
};
