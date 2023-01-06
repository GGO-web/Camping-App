import React from 'react';
import {
  Assets, Button, Colors, Text, View,
} from 'react-native-ui-lib';

import * as Clipboard from 'expo-clipboard';

import { useAppSelector } from '../../redux/hooks';
import { userSelector } from '../../redux/userConfig/userSlice';

export function ClipboardID() {
  const { uid: userId } = useAppSelector(userSelector);

  const clipboardHandler = async () => {
    await Clipboard.setStringAsync(userId);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.primary50,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16,
      }}
    >
      <Text primary marginB-4>
        your ID
      </Text>

      <View centerV row spread>
        <Text paragraph2 primary900 selectable>
          {userId.slice(0, 10).toUpperCase()}
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
  );
}
