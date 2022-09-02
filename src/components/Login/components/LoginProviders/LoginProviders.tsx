import React from "react";

import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";

import { firebaseAuth } from "../../../../firebase/firebase";
import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";

import { globalStyles } from "../../../../styles/global";
import { loginProvidersStyles } from "./LoginProvidersStyle";

import { useAppDispatch } from "../../../../redux/hooks";
import { signIn } from "../../../../redux/userConfig/userSlice";
import { IUser } from "../../../../redux/userConfig/user.model";

export const LoginProviders = ({
   response,
   promptAsync,
}: {
   response: any;
   promptAsync: any;
}) => {
   const navigation = useNavigation();

   const dispatch = useAppDispatch();

   const loginWithGoogle = async () => {
      // Get the users ID token
      try {
         await firebaseAuth.signOut(); // if user is logged in before

         promptAsync();
      } catch (err: any) {
         console.log(err.message);
      }
   };

   const providerRedirect = async () => {
      if (response?.type === "success") {
         const { id_token } = response.authentication;
         const { access_token } = response.params;

         // Create a Google credential with the token
         const googleCredential = GoogleAuthProvider.credential(
            id_token,
            access_token
         );

         // Sign-in the user with the credential
         await signInWithCredential(firebaseAuth, googleCredential);

         const user: User = firebaseAuth.currentUser as User;

         dispatch(
            signIn({ email: user.email, fullname: user.displayName } as IUser)
         );

         // redirect to homepage
         navigation.navigate("Homepage" as never);
      }
   };

   React.useEffect(() => {
      providerRedirect();
   }, [response]);

   return (
      <View>
         <Text variant="bodyLarge" style={loginProvidersStyles.headline}>
            or continue with
         </Text>

         <View style={loginProvidersStyles.icons}>
            <TouchableOpacity
               style={{
                  ...globalStyles.buttonOutlined,
                  ...loginProvidersStyles.icon,
               }}
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
