import React from 'react';
import {
  Animated, ImageStyle, StyleProp, TextStyle, ViewStyle,
} from 'react-native';

import {
  Assets, Colors, Text, View,
} from 'react-native-ui-lib';

import { ButtonIcon } from '../Buttons/ButtonIcon';

import { AssetsIconsType } from '../../matherialUI';

export interface StepperProps {
  value: number;
  minValue: number;
  maxValue: number;
  buttonControlsStyles?: StyleProp<
  ViewStyle | Animated.AnimatedProps<ViewStyle>
  >;
  buttonControlsIconStyles?: StyleProp<ImageStyle>,
  textStyle?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
  onValueChange: (value: number) => void;
}

export function Stepper({
  value,
  minValue,
  maxValue,
  onValueChange,
  textStyle,
  buttonControlsStyles,
  buttonControlsIconStyles,
}: StepperProps) {
  const [stepperValue, setStepperValue] = React.useState(value);

  const onStepperValueChange = (newValue: number) => {
    if (newValue < minValue) {
      return;
    }

    if (newValue > maxValue) {
      return;
    }

    setStepperValue(newValue);
    onValueChange(newValue);
  };

  const renderControlButton = (buttonIcon: AssetsIconsType, buttonCallback: Function) => (
    <ButtonIcon
      iconSource={buttonIcon}
      buttonStyles={{
        ...{
          width: 32,
          minWidth: 32,
          padding: 8,
          borderRadius: 100,
          backgroundColor: Colors.white,
        },
        ...(buttonControlsStyles as any),
      }}
      iconStyles={{
        ...{
          width: 16,
          height: 16,
          tintColor: Colors.black,
        },
        ...(buttonControlsIconStyles as any),
      }}
      onPressCallback={buttonCallback}
    />
  );

  return (
    <View row centerV>
      {renderControlButton(
        (Assets.icons as AssetsIconsType).minus,
        () => onStepperValueChange(stepperValue - 1),
      )}

      <Text marginH-4 center paragraph3 style={[{ minWidth: 40 }, textStyle]}>
        {stepperValue}
      </Text>

      {renderControlButton(
        (Assets.icons as AssetsIconsType).plus,
        () => onStepperValueChange(stepperValue + 1),
      )}
    </View>
  );
}
