import React from 'react';
import {
  Animated, ImageStyle, StyleProp, ViewStyle,
} from 'react-native';

import { GestureEvent } from 'react-native-gesture-handler';

import {
  Button, ButtonProps,
} from 'react-native-ui-lib';
import type { AssetsIconsType } from '../../matherialUI';

export function ButtonIcon({
  iconSource,
  buttonStyles,
  iconStyles,
  onPressCallback,
  ...buttonProps
}: {
  iconSource: AssetsIconsType,
  buttonStyles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
  iconStyles?: StyleProp<ImageStyle>,
  onPressCallback?: Function,
  [key: string]: React.ComponentClass<ButtonProps, any> & typeof Button | any,
}) {
  return (
    <Button
      backgroundColor="transparent"
      style={{
        borderRadius: 0,
        ...(buttonStyles as any),
      }}
      iconSource={iconSource}
      iconStyle={iconStyles}
      onPress={(e: GestureEvent) => {
        if (onPressCallback) onPressCallback(e);
      }}
      {...buttonProps}
    />
  );
}
