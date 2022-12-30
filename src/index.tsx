import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import {
  FirebaseAppProvider,
  AuthProvider,
  FirestoreProvider,
} from 'reactfire';
import { store } from './redux/store';

import { firebaseApp, firebaseAuth, firestore } from './firebase/firebase';

import './matherialUI';

import App from './App';

registerRootComponent(() => (
  <FirebaseAppProvider firebaseApp={firebaseApp} suspense>
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
));
