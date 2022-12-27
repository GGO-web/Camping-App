import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import {
  Button, ButtonProps, Colors, Text, ViewProps,
} from 'react-native-ui-lib';

import { globalStyles } from '../../styles/global';

export function ButtonPrimary({
  buttonText,
  buttonCallback,
  buttonStyles,
  ...buttonProps
}: {
  buttonText: string,
  buttonCallback?: Function,
  buttonStyles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
  buttonProps?: ButtonProps & typeof Button,
}) {
  return (
    <Button
      style={{ ...globalStyles.button, ...(buttonStyles as any) }}
      backgroundColor={Colors.primary}
      mode="outlined"
      onPress={buttonCallback}
      {...buttonProps}
    >
      <Text
        style={{
          ...globalStyles.text,
          ...globalStyles.buttonText,
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}
