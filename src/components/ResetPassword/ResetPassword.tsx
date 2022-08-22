import React, { useState } from "react";

import { Text, Toast, View } from "react-native-ui-lib";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ResetPasswordForm } from "./components/ResetPasswordForm/ResetPasswordForm";

import { globalStyles } from "../../styles/global";
import { authStyles } from "../../styles/auth";
import { CrumbsLink } from "../common/CrumbsLink";
import { useNavigation } from "@react-navigation/native";

export const resetPasswordSchema = Yup.object().shape({
   email: Yup.string()
      .email("Something is missing. please type a valid email")
      .required("Email is required"),
});

export interface IResetPassword {
   email: string;
}

export const ResetPassword = () => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: IResetPassword = {
      email: "",
   };

   const navigation = useNavigation();

   const formSubmitHandler = async (
      values: IResetPassword,
      actions: FormikHelpers<IResetPassword>
   ) => {
      try {
         await sendPasswordResetEmail(firebaseAuth, values.email);

         navigation.navigate(
            "Hurrey" as never,
            {
               page: "Login",
               text: "Password reset link sent! Go to your email and follow the link",
            } as never
         );
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
      <View style={{ ...globalStyles.container, ...globalStyles.navcontainer }}>
         <CrumbsLink>Reset password</CrumbsLink>

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
            <Text style={{ ...globalStyles.text, ...authStyles.feedback }}>
               Ooops something went wrong. Please try again
            </Text>
         </Toast>
      </View>
   );
};
