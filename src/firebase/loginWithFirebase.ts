import { NavigationHelpers, useNavigation } from '@react-navigation/native';
import { User } from 'firebase/auth';

import { useLazyGetUserByIdQuery } from '../redux/api/user';
import { useAppDispatch } from '../redux/hooks';

import { signIn } from '../redux/userConfig/userSlice';

import { firebaseAuth } from './firebase';

export function useLoginWithFirebase() {
  const navigation: NavigationHelpers<Record<string, object | undefined>, any> = useNavigation();
  const dispatch = useAppDispatch();
  const [getUserRequest] = useLazyGetUserByIdQuery();

  return async () => {
    const { uid } = firebaseAuth.currentUser as User;

    const userDB = await getUserRequest(uid).unwrap();

    dispatch(
      signIn({
        uid: userDB.uid,
        fullname: userDB.fullname,
        avatar: userDB.avatar,
      }),
    );

    navigation.navigate('Homepage' as never);
  };
}
