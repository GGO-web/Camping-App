import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";

import { Link, useNavigation } from "@react-navigation/native";

import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Toast } from "react-native-ui-lib/src/incubator";
import { Text } from "react-native-ui-lib";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ILogin } from "./Login.model";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { LoginProviders } from "./components/LoginProviders/LoginProviders";

import { globalStyles } from "../../styles/global";
import { authStyles } from "../../styles/auth";
import { useAppDispatch } from "../../redux/hooks";
import { signIn } from "../../redux/userConfig/userSlice";
import { IUser } from "../../redux/userConfig/user.model";

export const signInSchema = Yup.object().shape({
   email: Yup.string()
      .email("Something is missing. please type a valid email")
      .required("Email is required"),
   password: Yup.string()
      .min(6, "The password must be at least 6 characters long")
      .required("Password is required"),
});

export const Login = () => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: ILogin = {
      email: "",
      password: "",
   };

   const navigation = useNavigation();

   const dispatch = useAppDispatch();

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

         const user: User = firebaseAuth.currentUser as User;

         dispatch(
            signIn({ email: user.email, fullname: user.displayName } as IUser)
         );
         navigation.navigate("Homepage" as never);
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
                  onSubmit={(values: ILogin, actions) => {
                     formSubmitHandler(values, actions);
                  }}
                  validationSchema={signInSchema}
                  validateOnMount={true}
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
