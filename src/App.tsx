import React from "react";
import { ActivityIndicator } from "react-native-paper";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";

import { Login } from "./components/Login/Login";
import { Onboarding } from "./components/Onboarding/Onboarding";
import { SignUp } from "./components/SignUp/SignUp";

const Stack = createNativeStackNavigator();

import { Colors } from "react-native-ui-lib";
Colors.loadColors({ primary: "#84CC16", red: "#EA1601", dark: "#3F3F46" });

export default function App() {
   const [loaded] = useFonts({
      SFProMedium: require("../assets/fonts/SFProDisplay-Medium.ttf"),
      SFProRegular: require("../assets/fonts/SFProDisplay-Regular.ttf"),
   });

   if (!loaded) {
      return <ActivityIndicator animating={true} />;
   }

   return (
      <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Login"
      >
         <Stack.Screen name="Login" component={Login}></Stack.Screen>
         <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
         <Stack.Screen name="Onboarding" component={Onboarding}></Stack.Screen>
      </Stack.Navigator>
   );
}
