import React from "react";

import { Image, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import { globalStyles, mergeStyles } from "../../../../styles/global";

import { loginProvidersStyles } from "./LoginProvidersStyle";

export const LoginProviders = () => {
   return (
      <View>
         <Text variant="bodyLarge" style={loginProvidersStyles.headline}>
            or continue with
         </Text>
         <Divider style={loginProvidersStyles.divider} bold={true}></Divider>
         <View style={loginProvidersStyles.icons}>
            <TouchableOpacity
               style={mergeStyles([
                  globalStyles.buttonOutlined,
                  loginProvidersStyles.icon,
               ])}
               activeOpacity={0.8}
            >
               <Image
                  source={{
                     width: 32,
                     height: 32,
                     uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
                  }}
               ></Image>
            </TouchableOpacity>
         </View>
         {/* <div className="login__auth mt-5 mb-5">

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
   );
};
