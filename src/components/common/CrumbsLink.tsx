import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import {
  Button, ButtonProps, Colors, Icon, Text, View,
} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { ButtonIcon } from '../Buttons/ButtonIcon';

import { AssetsIconsType } from '../../matherialUI';

import { ScreenNavigationProp } from '../../types';

export function CrumbsLink({
  children,
  style,
  iconStyles,
  iconRight,
  iconRightStyles,
  onPressIconRight,
  buttonIconRightProps,
}: {
  children: any,
  style?: any,
  iconStyles?: any,
  iconRight?: AssetsIconsType,
  iconRightStyles?: StyleProp<ImageStyle>,
  onPressIconRight?: Function,
  buttonIconRightProps?: ButtonProps & typeof Button | any,
}) {
  const navigation = useNavigation<ScreenNavigationProp>();

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
          iconSource={iconRight as AssetsIconsType}
          iconStyles={{ tintColor: Colors.dark, ...(iconRightStyles as any) }}
          onPressCallback={() => {
            if (onPressIconRight) {
              onPressIconRight();
            }
          }}
          {...buttonIconRightProps as any}
        />
      )}
    </View>
  );
}
