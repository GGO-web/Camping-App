import React, { useEffect } from 'react';
import {
  Assets, Avatar, Colors, Text, TouchableOpacity,
} from 'react-native-ui-lib';
import {
  ImageInfo, ImagePickerResult, launchImageLibraryAsync, MediaTypeOptions,
} from 'expo-image-picker';

import { useActions } from '../../../../hooks/actions';
import { useAppSelector } from '../../../../redux/hooks';
import { userSelector } from '../../../../redux/userConfig/userSlice';
import { firebaseAuth } from '../../../../firebase/firebase';
import { AssetsIconsType } from '../../../../matherialUI';

export function ProfileAvatar() {
  const { avatar } = useAppSelector(userSelector);

  const { setProfileAvatar } = useActions();

  const takeProfileImage = async () => {
    const pickerResult: ImagePickerResult | ImageInfo = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileAvatar(pickerResult.assets[0].uri);
    }
  };

  useEffect(() => {
    if (!avatar) {
      setProfileAvatar(firebaseAuth.currentUser?.photoURL as string);
    }
  }, []);

  return (
    <TouchableOpacity
      row
      centerV
      marginB-24
      activeOpacity={0.8}
      onPress={takeProfileImage}
    >
      <Avatar
        source={
          avatar
            ? {
              uri: avatar,
            }
            : (Assets.icons as AssetsIconsType).avatar
      }
        size={100}
        backgroundColor={Colors.primary100}
        imageStyle={{
          borderRadius: 16,
        }}
      />

      <Text
        marginL-8
        paragraph3
        style={{ color: Colors.primary500 }}
      >
        Change Profile
      </Text>
    </TouchableOpacity>
  );
}
