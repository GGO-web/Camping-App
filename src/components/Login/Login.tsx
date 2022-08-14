import React, { useState } from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";

import { Link } from "@react-navigation/native";

import { Formik, FormikHelpers, FormikValues } from "formik";
import { Divider, Snackbar, Text } from "react-native-paper";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ILogin } from "./Login.model";
import { loginStyles } from "./LoginStyles";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { LoginProviders } from "./components/LoginProviders/LoginProviders";

// TODO: Add signIn with Providers

export const Login = (props: any) => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: ILogin = {
      email: "",
      password: "",
   };

   const formSubmitHandler = async (
      values: ILogin,
      actions: FormikHelpers<ILogin>
   ) => {
      actions.validateForm(values);

      try {
         await signInWithEmailAndPassword(
            firebaseAuth,
            values.email,
            values.password
         );

         actions.resetForm();

         props.navigation.navigate("Homepage");
      } catch (error: any) {
         const fireError = error as FirebaseError;

         console.log(fireError.message);

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
         } else {
            setFormFeedbackModal(true);
         }
      }
   };

   const formValidate = (values: FormikValues) => {
      const errors: ILogin = { email: "", password: "" };

      if (!values.email.length) {
         errors.email = "Email is required";
      } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
         errors.email = "Something is missing. please type a valid email";
      }

      if (!values.password.length) {
         errors.password = "Password is required";
      } else if (values.password.length < 3) {
         errors.password = "The password is too weak";
      }

      return errors;
   };

   return (
      <KeyboardAvoidingView
         enabled={false}
         behavior="height"
         style={{ flex: 1 }}
      >
         <View style={loginStyles.wrapper}>
            <View style={loginStyles.form}>
               <Link
                  style={loginStyles.logoWrapper}
                  to={{ screen: "Onboarding" }}
               >
                  <Image
                     style={loginStyles.logo}
                     source={require("../../../assets/logo.png")}
                  ></Image>
               </Link>

               <Formik
                  initialValues={formInitialValues}
                  onSubmit={(values: ILogin, actions) => {
                     formSubmitHandler(values, actions);
                  }}
                  validate={formValidate}
               >
                  {(formik) => (
                     <LoginForm
                        formSubmitHandler={formSubmitHandler}
                        formik={formik}
                     ></LoginForm>
                  )}
               </Formik>

               <LoginProviders></LoginProviders>
            </View>

            <Snackbar
               visible={formFeedbackModal}
               wrapperStyle={{ left: 15 }}
               onDismiss={() => setFormFeedbackModal(false)}
               action={{
                  label: "Close",
                  onPress: () => {
                     setFormFeedbackModal(false);
                  },
               }}
            >
               Ooops something went wrong. Please try again
            </Snackbar>
         </View>
      </KeyboardAvoidingView>
   );
};
