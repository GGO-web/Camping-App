import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import {
  Assets, Button, Colors, Text, View,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../Buttons/ButtonIcon';

import { AssetsIconsType } from '../../matherialUI';

import { headerStyles } from './HeaderStyles';

export function Header({
  title,
  showMenu,
  setShowMenu,
  scaleValue,
  offsetValue,
  iconRight,
}: {
  title: string;
  showMenu: boolean;
  setShowMenu: Function;
  scaleValue: any;
  offsetValue: any;
  iconRight?: AssetsIconsType
}) {
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: !showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: !showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showMenu, scaleValue, offsetValue]);

  return (
    <View style={headerStyles.header}>
      <Button
        left
        padding-5
        style={{
          ...headerStyles.headerButton,
        }}
        backgroundColor="transparent"
        iconSource={
          !showMenu
            ? Assets.getAssetByPath('icons.menu')
            : Assets.getAssetByPath('icons.back')
        }
        onPress={() => {
          setShowMenu(!showMenu);
        }}
      />

      <Text style={headerStyles.headerTitle} heading4>
        {title}
      </Text>

      {iconRight && (
      <ButtonIcon
        buttonStyles={{ width: 32, height: 32 }}
        iconSource={iconRight}
        iconStyles={{ tintColor: Colors.dark }}
      />
      )}
    </View>
  );
}
