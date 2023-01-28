import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import {
  View, Text, Colors,
} from 'react-native-ui-lib';

import { useNavigation } from '@react-navigation/native';
import { ButtonIcon } from '../Buttons/ButtonIcon';

import { AssetsIconsType } from '../../matherialUI';

import { ScreenNavigationProp } from '../../types';

export function ActionsTab({
  title,
  isActive = false,
  iconsStyles,
  iconSource,
}: {
  title: string,
  iconSource: AssetsIconsType
  isActive?: boolean,
  iconsStyles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
}) {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View
      centerV
      row
      left
      paddingV-6
      paddingH-10
      style={{
        borderRadius: 16,
        backgroundColor: isActive ? Colors.primary600 : Colors.primary,
      }}
    >
      <ButtonIcon
        buttonStyles={{
          width: 32,
          height: 32,
        }}
        iconStyles={{
          ...(iconsStyles as any),
        }}
        iconSource={iconSource}
        onPressCallback={() => {
          navigation.navigate(title);
        }}
      />

      {isActive && (
        <Text marginL-8 white paragraph3>{title}</Text>
      )}
    </View>
  );
}
