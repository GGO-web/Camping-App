import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import {
  View, Text, Colors,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../Buttons/ButtonIcon';

import { AssetsIconsType } from '../../matherialUI';

export function ActionsTab({
  textContent,
  isActive = false,
  iconsStyles,
  iconSource,
}: {
  textContent: string,
  iconSource: AssetsIconsType
  isActive?: boolean,
  iconsStyles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
}) {
  const activatedAction = isActive || isActive === undefined;

  return (
    <View
      centerV
      row
      left
      paddingV-6
      paddingH-10
      style={{
        borderRadius: 16,
        backgroundColor: activatedAction ? Colors.primary600 : Colors.primary,
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
      />

      {activatedAction && (
        <Text marginL-8 white paragraph3>{textContent}</Text>
      )}
    </View>
  );
}
