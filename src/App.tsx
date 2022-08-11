import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <Stack.Navigator
         screenOptions={{ headerShown: false }}
         initialRouteName="Login"
      >
         <Stack.Screen name="Login" component={Login}></Stack.Screen>
         <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
      </Stack.Navigator>
   );
}
