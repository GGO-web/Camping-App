import { StyleSheet } from "react-native";

import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";

import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator
               screenOptions={{ headerShown: false }}
               initialRouteName="Login"
            >
               <Stack.Screen name="Login" component={Login}></Stack.Screen>
               <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 100,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
   },
});

registerRootComponent(App);
