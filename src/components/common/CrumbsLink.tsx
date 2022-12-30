import React from 'react';
import {
  Button, Colors, Icon, Text, View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { ImageStyle, StyleProp } from 'react-native';
import { AssetsIconsType } from '../../matherialUI';
import { ButtonIcon } from '../Buttons/ButtonIcon';

export function CrumbsLink({
  children,
  style,
  iconStyles,
  iconRight,
  iconRightStyles,
  onPressIconRight,
}: {
  children: any,
  style?: any,
  iconStyles?: any
  iconRight?: AssetsIconsType
  iconRightStyles?: StyleProp<ImageStyle>,
  onPressIconRight?: Function
}) {
  const navigation = useNavigation();

  return (
    <View row centerV spread marginB-25>
      <Button
        left
        onPress={() => navigation.goBack()}
        centerV
        style={style}
        backgroundColor="transparent"
      >
        <Icon
          style={{
            width: 14, height: 14, resizeMode: 'contain', ...iconStyles,
          }}
          marginR-8
          assetName="chevron_left"
        />

        <Text paragraph1 mrAuto>
          {children}
        </Text>

      </Button>

      {iconRight && (
        <ButtonIcon
          buttonStyles={{
            width: 32,
            height: 32,
            padding: 6,
          }}
          iconSource={iconRight}
          iconStyles={{ tintColor: Colors.dark, ...(iconRightStyles as any) }}
          onPressCallback={() => {
            if (onPressIconRight) {
              onPressIconRight();
            }
          }}
        />
      )}
    </View>
  );
}
