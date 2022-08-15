import React from "react";

import { Image, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

import { globalStyles, mergeStyles } from "../../../../styles/global";

import { loginProvidersStyles } from "./LoginProvidersStyle";
import { firebaseAuth } from "../../../../firebase/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { RevokeTokenRequestConfig } from "expo-auth-session";
import { useAuth } from "reactfire";

const authConfig = {
   clientId: process.env.REACT_APP_CLIENT_ID,
   scopes: ["profile", "email"],
};

export const LoginProviders = ({ navigation }: { navigation: any }) => {
   const [request, response, promptAsync]: any =
      Google.useAuthRequest(authConfig);

   const loginWithGoogle = async () => {
      // Get the users ID token
      try {
         console.log(response?.type === "success" && !firebaseAuth.currentUser);

         if (response?.type === "success" && firebaseAuth.currentUser == null) {
            const { id_token } = response.authentication;
            const { access_token } = response.params;

            // Create a Google credential with the token
            const googleCredential = GoogleAuthProvider.credential(
               id_token,
               access_token
            );

            // Sign-in the user with the credential
            signInWithCredential(firebaseAuth, googleCredential);

            // redirect to homepage
            navigation.navigate("Homepage");
         } else {
            promptAsync();
         }
      } catch (err: any) {
         console.log(err.message);
      }
   };

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
               onPress={() => loginWithGoogle()}
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
      </View>
   );
};
