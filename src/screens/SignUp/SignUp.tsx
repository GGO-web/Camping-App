import React, { useState } from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";

import { Link, useNavigation } from "@react-navigation/native";

import * as Google from "expo-auth-session/providers/google";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Toast } from "react-native-ui-lib/src/incubator";
import { Text } from "react-native-ui-lib";

import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ISignUp } from "./SignUp.model";
import { LoginProviders } from "../Login/components/LoginProviders/LoginProviders";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";

import { globalStyles } from "../../styles/global";
import { authStyles } from "../../styles/auth";
import { authConfig } from "../../constants";

export const signUpSchema = Yup.object().shape({
   username: Yup.string()
      .matches(
         /^[a-zA-Z]/,
         'Please, provide a name in the correct form, for example, "John Smith"'
      )
      .min(3, "Name is too short")
      .required("Name is required"),
   email: Yup.string()
      .email("Something is missing. please type a valid email")
      .required("Email is required"),
   password: Yup.string()
      .min(7, "Password is too short")
      .required("Password is required"),
});

export const SignUp = () => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: ISignUp = {
      username: "",
      email: "",
      password: "",
   };

   const navigation = useNavigation();

   const [request, response, promptAsync]: any =
      Google.useAuthRequest(authConfig);

   const formSubmitHandler = async (
      values: ISignUp,
      actions: FormikHelpers<ISignUp>
   ) => {
      try {
         const result = await createUserWithEmailAndPassword(
            firebaseAuth,
            values.email,
            values.password
         );

         await updateProfile(result.user, {
            displayName: values.username,
         });

         navigation.navigate(
            "Hurrey" as never,
            {
               page: "Login",
               text: "Your registration is successful. please go back and log-in.",
            } as never
         );

         actions.resetForm();
      } catch (error: any) {
         const fireError = error as FirebaseError;

         // firebase errors validation
         if (fireError.message.includes("wrong-password")) {
            actions.setFieldError("password", "The entered password is wrong.");
         } else if (
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
      <KeyboardAvoidingView
         enabled={false}
         behavior="height"
         style={{ flex: 1 }}
      >
         <View style={authStyles.wrapper}>
            <View style={authStyles.form}>
               <Link
                  style={authStyles.logoWrapper}
                  to={{ screen: "Onboarding" }}
               >
                  <Image
                     style={authStyles.logo}
                     source={require("../../../assets/logo.png")}
                  ></Image>
               </Link>

               <Formik
                  initialValues={formInitialValues}
                  onSubmit={(values: ISignUp, actions) => {
                     formSubmitHandler(values, actions);
                  }}
                  validationSchema={signUpSchema}
                  validateOnMount={true}
               >
                  {(formik) => (
                     <SignUpForm
                        formSubmitHandler={formSubmitHandler}
                        formik={formik}
                     ></SignUpForm>
                  )}
               </Formik>

               <LoginProviders
                  response={response}
                  promptAsync={promptAsync}
               ></LoginProviders>
            </View>

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
      </KeyboardAvoidingView>
   );
};
