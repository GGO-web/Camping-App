import { useNavigation } from '@react-navigation/native';

import { useLazyGetUserQuery } from '../redux/api/user';
import { useAppDispatch } from '../redux/hooks';

import { signIn } from '../redux/userConfig/userSlice';

import { ScreenNavigationProp } from '../types';

export function useLoginWithFirebase() {
  const navigation = useNavigation<ScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const [getUserRequest] = useLazyGetUserQuery();

  return async () => {
    const userDB = await getUserRequest().unwrap();

    dispatch(
      signIn({
        uid: userDB.uid,
        fullname: userDB.fullname,
        avatar: userDB.avatar,
      }),
    );

    navigation.navigate('Homepage');
  };
}
