import React, { useState } from "react";
import { Image, KeyboardAvoidingView, View } from "react-native";

import { Link } from "@react-navigation/native";

import {
   Formik,
   FormikHelpers,
   FormikValues,
   useFormik,
   useFormikContext,
} from "formik";
import {
   Button,
   HelperText,
   Snackbar,
   Text,
   TextInput,
   useTheme,
} from "react-native-paper";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase";

import { ILogin } from "./Login.model";
import { loginStyles } from "./LoginStyles";

export const Login = (props: any) => {
   const [formFeedbackModal, setFormFeedbackModal] = useState(false);

   const formInitialValues: ILogin = {
      email: "",
      password: "",
      formFeedback: "",
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
      } catch (error: any) {
         const fireError = error as FirebaseError;

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
            actions.setFieldError("formFeedback", fireError.message);
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
         behavior="padding"
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
                     <View>
                        <View style={loginStyles.formGroup}>
                           <TextInput
                              label="Email"
                              autoComplete="email"
                              keyboardType="email-address"
                              onChangeText={formik.handleChange("email")}
                              value={formik.values.email}
                              placeholder="Your email"
                              mode="outlined"
                              error={!!formik.errors.email}
                           />

                           <HelperText
                              type="error"
                              padding="none"
                              visible={!!formik.errors.email}
                           >
                              {formik.errors.email}
                           </HelperText>
                        </View>

                        <View style={loginStyles.formGroup}>
                           <TextInput
                              label="Password"
                              onChangeText={formik.handleChange("password")}
                              value={formik.values.password}
                              placeholder="Your password"
                              mode="outlined"
                              error={!!formik.errors.password}
                           />

                           <HelperText
                              type="error"
                              padding="none"
                              visible={!!formik.errors.password}
                           >
                              {formik.errors.password}
                           </HelperText>
                        </View>

                        <Button
                           uppercase={false}
                           style={loginStyles.formButton}
                           mode="contained"
                           onPress={() => formik.handleSubmit()}
                        >
                           <Text style={loginStyles.formButtonText}>
                              Log In
                           </Text>
                        </Button>
                     </View>
                  )}
               </Formik>

               {/* <div className="login__auth mt-5 mb-5">
               <h2 className="login__auth-title text-muted text-center mt-3 mb-3">
                  <span>or continue with</span>
               </h2>

               <Row
                  xs="auto"
                  className="login__auth-providers d-flex justify-content-center"
               >
                  <Col>
                     <Button
                        onClick={() => loginWith(FacebookAuthProvider)}
                        className="login__auth-button btn-reset"
                     >
                        <img
                           className="login__auth-img"
                           src="images/facebook.svg"
                           alt="facebook"
                        />
                     </Button>
                  </Col>
                  <Col>
                     <Button
                        onClick={() => loginWith(GoogleAuthProvider)}
                        className="login__auth-button btn-reset"
                     >
                        <img
                           className="login__auth-img"
                           src="images/google.svg"
                           alt="google"
                        />
                     </Button>
                  </Col>
               </Row>
            </div> */}

               {/* <p className="authentication__text-moveback text-center text-muted">
               Don't have an account?{" "}
               <NavLink className="link-primary" to="/signup">
                  Sign up
               </NavLink>
            </p> */}
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
