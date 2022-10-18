import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "./firebase/firebase";

import { useAppDispatch } from "./redux/hooks";
import { signIn } from "./redux/userConfig/userSlice";
import { IUser } from "./redux/userConfig/user.model";

import { Hurrey } from "./components/common/Hurrey";

import { ResetPassword } from "./screens/ResetPassword/ResetPassword";
import { Onboarding } from "./screens/Onboarding/Onboarding";
import { Login } from "./screens/Login/Login";
import { SignUp } from "./screens/SignUp/SignUp";
import { Home } from "./screens/Home/Home";
import { Logout } from "./screens/Logout/Logout";
import { HowToUse } from "./screens/HowToUse/HowToUse";
import { Language } from "./screens/Language/Language";
import { NewTrip } from "./screens/NewTrip/NewTrip";
import { Teammates } from "./screens/NewTrip/components/Teammates/Teammates";

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
      setTimeout(() => {
         if (firebaseAuth.currentUser) {
            const user: User = firebaseAuth.currentUser as User;

            dispatch(
               signIn({
                  email: user.email,
                  fullname: user.displayName,
               } as IUser)
            );
            navigation.navigate("Homepage" as never);
         } else {
            navigation.navigate("Login" as never);
         }
      }, 1000);
   };

   useEffect(() => {
      onAuthStateChanged(firebaseAuth, signInWithFirebase);
   }, []);

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
         <Stack.Screen name="NewTrip" component={NewTrip}></Stack.Screen>
         <Stack.Screen name="Teammates" component={Teammates}></Stack.Screen>
      </Stack.Navigator>
   );
}
