import React from "react";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { store } from "./redux/store";

import { firebaseApp, firebaseAuth, firestore } from "./firebase/firebase";
import {
   FirebaseAppProvider,
   AuthProvider,
   FirestoreProvider,
} from "reactfire";

import App from "./App";

const theme = {
   ...DefaultTheme,
   roundness: 2,
   version: 3,
   colors: {
      ...DefaultTheme.colors,
      primary: "#84CC16",
      secondary: "#f1c40f",
      tertiary: "#a1b2c3",
      text: "#000",
   },
};

registerRootComponent(() => {
   return (
      <FirebaseAppProvider firebaseApp={firebaseApp} suspense={true}>
         <AuthProvider sdk={firebaseAuth}>
            <FirestoreProvider sdk={firestore}>
               <Provider store={store}>
                  <NavigationContainer>
                     {/* App component start! */}
                     <PaperProvider theme={theme}>
                        <App />
                     </PaperProvider>
                     {/* App component end! */}
                  </NavigationContainer>
               </Provider>
            </FirestoreProvider>
         </AuthProvider>
      </FirebaseAppProvider>
   );
});
