import React, { useState } from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";

import { Link } from "@react-navigation/native";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Snackbar } from "react-native-paper";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ILogin } from "./Login.model";
import { loginStyles } from "./LoginStyles";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { LoginProviders } from "./components/LoginProviders/LoginProviders";

export const signInSchema = Yup.object().shape({
   email: Yup.string()
      .email("Something is missing. please type a valid email")
      .required("Email is required"),
   password: Yup.string()
      .min(7, "Password is too short")
      .required("Password is required"),
});

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
      try {
         await signInWithEmailAndPassword(
            firebaseAuth,
            values.email,
            values.password
         );

         props.navigation.navigate("Homepage");

         actions.resetForm();
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
                  validationSchema={signInSchema}
               >
                  {(formik) => (
                     <LoginForm
                        formSubmitHandler={formSubmitHandler}
                        formik={formik}
                     ></LoginForm>
                  )}
               </Formik>

               <LoginProviders navigation={props.navigation}></LoginProviders>
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
