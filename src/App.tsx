import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { Login } from "./screens/Login/Login";
import { Onboarding } from "./screens/Onboarding/Onboarding";
import { SignUp } from "./screens/SignUp/SignUp";
import { Hurrey } from "./components/common/Hurrey";
import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import { Home } from "./screens/Home/Home";
import { Logout } from "./screens/Logout/Logout";

import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "./firebase/firebase";

import { useAppDispatch } from "./redux/hooks";
import { signIn } from "./redux/userConfig/userSlice";
import { IUser } from "./redux/userConfig/user.model";
import { HowToUse } from "./screens/HowToUse/HowToUse";
import { Language } from "./screens/Language/Language";

const Stack = createNativeStackNavigator();

export default function App() {
   const [loaded] = useFonts({
      SFProSemibold: require("../assets/fonts/SFProDisplay-Semibold.ttf"),
      SFProMedium: require("../assets/fonts/SFProDisplay-Medium.ttf"),
      SFProRegular: require("../assets/fonts/SFProDisplay-Regular.ttf"),
   });

   const navigation = useNavigation();
   const dispatch = useAppDispatch();

   const signInWithFirebase = () => {
      if (firebaseAuth.currentUser) {
         const user: User = firebaseAuth.currentUser as User;

         dispatch(
            signIn({ email: user.email, fullname: user.displayName } as IUser)
         );
         navigation.navigate("Homepage" as never);
      } else {
         navigation.navigate("Login" as never);
      }
   };

   useEffect(() => {
      onAuthStateChanged(firebaseAuth, signInWithFirebase);
   });

   if (!loaded) {
      return <ActivityIndicator animating={true} />;
   }

   return (
      <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Onboarding"
      >
         <Stack.Screen name="Login" component={Login}></Stack.Screen>
         <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
         <Stack.Screen name="Onboarding" component={Onboarding}></Stack.Screen>
         <Stack.Screen name="Hurrey" component={Hurrey}></Stack.Screen>
         <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
         ></Stack.Screen>
         <Stack.Screen name="Homepage" component={Home}></Stack.Screen>
         <Stack.Screen name="Logout" component={Logout}></Stack.Screen>
         <Stack.Screen name="HowToUse" component={HowToUse}></Stack.Screen>
         <Stack.Screen name="Language" component={Language}></Stack.Screen>
      </Stack.Navigator>
   );
}
