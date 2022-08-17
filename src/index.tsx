import React from "react";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./redux/store";

import { firebaseApp, firebaseAuth, firestore } from "./firebase/firebase";
import {
   FirebaseAppProvider,
   AuthProvider,
   FirestoreProvider,
} from "reactfire";

import "./matherialUI";

import App from "./App";

registerRootComponent(() => {
   return (
      <FirebaseAppProvider firebaseApp={firebaseApp} suspense={true}>
         <AuthProvider sdk={firebaseAuth}>
            <FirestoreProvider sdk={firestore}>
               <Provider store={store}>
                  <NavigationContainer>
                     {/* App component start! */}
                     <App />
                     {/* App component end! */}
                  </NavigationContainer>
               </Provider>
            </FirestoreProvider>
         </AuthProvider>
      </FirebaseAppProvider>
   );
});
