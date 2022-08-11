import { Provider } from "react-redux";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import { store } from "./redux/store";

import {
   analytics,
   firebaseApp,
   firebaseAuth,
   firestore,
} from "./firebase/firebase";
import {
   FirebaseAppProvider,
   AuthProvider,
   FirestoreProvider,
   AnalyticsProvider,
} from "reactfire";
import App from "./App";

registerRootComponent(() => {
   return (
      <FirebaseAppProvider firebaseApp={firebaseApp} suspense={true}>
         <AuthProvider sdk={firebaseAuth}>
            <FirestoreProvider sdk={firestore}>
               <AnalyticsProvider sdk={analytics}>
                  <Provider store={store}>
                     <NavigationContainer>
                        {/* App component start! */}
                        <App></App>
                        {/* App component end! */}
                     </NavigationContainer>
                  </Provider>
               </AnalyticsProvider>
            </FirestoreProvider>
         </AuthProvider>
      </FirebaseAppProvider>
   );
});
