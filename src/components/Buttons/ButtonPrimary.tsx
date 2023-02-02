import React from 'react';
import {
  Animated, StyleProp, TextStyle, ViewStyle,
} from 'react-native';

import {
  Button, ButtonProps, Colors, Text,
} from 'react-native-ui-lib';

import { globalStyles } from '../../styles/global';

export function ButtonPrimary({
  buttonText,
  buttonCallback,
  buttonStyles,
  textStyles,
  ...buttonProps
}: {
  buttonText: string,
  buttonCallback?: Function,
  buttonStyles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
  textStyles?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>,
  buttonProps?: ButtonProps & typeof Button,
}) {
  return (
    <Button
      size={32}
      style={[globalStyles.button, buttonStyles]}
      backgroundColor={Colors.primary}
      mode="outlined"
      onPress={buttonCallback}
      {...buttonProps}
    >
      <Text
        style={[
          globalStyles.text,
          globalStyles.buttonText,
          textStyles,
        ]}
      >
        {buttonText}
      </Text>
    </Button>
  );
}
