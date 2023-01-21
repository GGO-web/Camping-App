import React, { useState } from 'react';
import {
  Assets, Button, Colors, Text, ToastPresets, View,
} from 'react-native-ui-lib';

import * as Clipboard from 'expo-clipboard';

import { useAppSelector } from '../../redux/hooks';
import { userSelector } from '../../redux/userConfig/userSlice';
import { Toast } from '../Toast/Toast';

export function ClipboardID() {
  const { uid: userId } = useAppSelector(userSelector);

  const [toastParams, setToastParams] = useState({
    visible: false,
    preset: ToastPresets.SUCCESS,
    message: 'Your ID has copied successfully',
  });

  const clipboardHandler = async () => {
    await Clipboard.setStringAsync(userId);

    setToastParams((prevToast) => ({ ...prevToast, visible: true }));
  };

  return (
    <>
      <Toast
        visible={toastParams.visible}
        preset={toastParams.preset}
        toastMessage={toastParams.message}
        duration={700}
        autoDismiss={700}
        onDismiss={() => {
          setToastParams((prevToast) => ({ ...prevToast, visible: false }));
        }}
      />

      <View
        style={{
          backgroundColor: Colors.primary50,
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 16,
        }}
      >
        <Text primary paragraph3 marginB-4>
          Your unique ID:
        </Text>

        <View centerV row spread>
          <Text paragraph2 primary900 selectable style={{ maxWidth: 260 }}>
            {userId.toUpperCase()}
          </Text>

          <Button
            backgroundColor="transparent"
            style={{ width: 32, height: 32 }}
            iconSource={Assets.icons.copy}
            iconStyle={{
              tintColor: Colors.primary900,
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
            onPress={() => clipboardHandler()}
          />
        </View>
      </View>
    </>
  );
}
