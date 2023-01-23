import React from 'react';
import {
  Assets, Avatar, Colors, Text, TouchableOpacity,
} from 'react-native-ui-lib';
import {
  ImagePickerResult, launchImageLibraryAsync, MediaTypeOptions,
} from 'expo-image-picker';

import { AssetsIconsType } from '../../../../matherialUI';

import { useGetUserQuery, useUpdateUserAvatarMutation } from '../../../../redux/api/user';

export function ProfileAvatar() {
  const { data: user } = useGetUserQuery();

  const [updateUserAvatar] = useUpdateUserAvatarMutation();

  const takeProfileImage = async () => {
    const pickerResult: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!pickerResult.canceled) {
      const { message } = await updateUserAvatar(pickerResult.assets[0].base64 as string).unwrap();

      console.log(message);
    }
  };

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
          user?.avatar
            ? {
              uri: user?.avatar,
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
