import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { useFonts } from 'expo-font';

import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase/firebase';

import { Hurrey } from './components/common/Hurrey';

import { ResetPassword } from './screens/ResetPassword/ResetPassword';
import { Onboarding } from './screens/Onboarding/Onboarding';
import { Login } from './screens/Login/Login';
import { SignUp } from './screens/SignUp/SignUp';
import { Home } from './screens/Home/Home';
import { Logout } from './screens/Logout/Logout';

import { HowToUse } from './screens/HowToUse/HowToUse';
import { Language } from './screens/Language/Language';

import { NewTrip } from './screens/NewTrip/NewTrip';
import { Teammembers } from './screens/NewTrip/components/Teammembers/Teammembers';
import { Locations } from './screens/NewTrip/components/Locations/Locations';
import { Location } from './screens/NewTrip/components/Locations/components/Location/Location';
import { Bag } from './screens/NewTrip/components/Bag/Bag';

import { Activities } from './screens/Activities/Activities';
import { AddActivity } from './screens/Activities/components/AddActivity/AddActivity';
import { Activity } from './screens/Activities/components/Activity/Activity';

import { Fitness } from './screens/Fitness/Fitness';
import { Backpack } from './screens/Backpack/Backpack';
import { Teammates } from './screens/Teammates/Teammates';

import { Profile } from './screens/Profile/Profile';
import { TipsAndTricks } from './screens/TipsAndTricks/TipsAndTricks';
import { Snaps } from './screens/Snaps/Snaps';
import { Feedback } from './screens/Feedback/Feedback';
import { Settings } from './screens/Settings/Settings';
import { ExitTrip } from './screens/ExitTrip/ExitTrip';
import { Notifications } from './screens/Notifications/Notifications';
import { TeammateProfile } from './screens/Teammates/components/TeammateProfile/TeammateProfile';

import { useLoginWithFirebase } from './firebase/loginWithFirebase';

import { ScreenNavigationProp, StackNavigatorParamsList } from './types';
import { Loader } from './components/Loader/Loader';

const Stack = createNativeStackNavigator<StackNavigatorParamsList>();

export default function App() {
  const [loaded] = useFonts({
    SFProSemibold: require('../assets/fonts/SFProDisplay-Semibold.ttf'),
    SFProMedium: require('../assets/fonts/SFProDisplay-Medium.ttf'),
    SFProRegular: require('../assets/fonts/SFProDisplay-Regular.ttf'),
  });

  const [isRegistrationLoading, setIsRegistrationLoading] = useState(true);

  const navigation = useNavigation<ScreenNavigationProp>();

  const loginWithFirebase = useLoginWithFirebase();

  const signInWithFirebase = () => {
    setTimeout(async () => {
      if (firebaseAuth.currentUser) {
        try {
          setIsRegistrationLoading(false);
          await loginWithFirebase();
          setIsRegistrationLoading(true);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          setIsRegistrationLoading(true);
        }
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, signInWithFirebase);
  }, []);

  if (!loaded) {
    return <ActivityIndicator animating />;
  }

  if (!isRegistrationLoading) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Hurrey" component={Hurrey} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen name="Homepage" component={Home} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="HowToUse" component={HowToUse} />
      <Stack.Screen name="Language" component={Language} />
      {/* Navigation menu expanded */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TipsAndTricks" component={TipsAndTricks} />
      <Stack.Screen name="Snaps" component={Snaps} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ExitTrip" component={ExitTrip} />
      <Stack.Screen name="Notifications" component={Notifications} />

      <Stack.Screen name="NewTrip" component={NewTrip} />
      <Stack.Screen name="Teammembers" component={Teammembers} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Bag" component={Bag} />

      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="AddActivity" component={AddActivity} />
      <Stack.Screen name="Activity" component={Activity} />

      <Stack.Screen name="Fitness" component={Fitness} />
      <Stack.Screen name="Backpack" component={Backpack} />
      <Stack.Screen name="Teammates" component={Teammates} />
      <Stack.Screen name="TeammateProfile" component={TeammateProfile} />
    </Stack.Navigator>
  );
}
