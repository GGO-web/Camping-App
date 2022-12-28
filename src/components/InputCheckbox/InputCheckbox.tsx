import React, { useState } from 'react';
import {
  Animated, StyleProp, ViewStyle,
} from 'react-native';
import {
  Assets, Checkbox, Colors,
} from 'react-native-ui-lib';
import { AssetsIconsType } from '../../matherialUI';

export function InputCheckbox({
  styles,
  onCheckboxChange,
}:
{
  styles?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>,
  onCheckboxChange?: Function
}) {
  const [checkboxState, setCheckboxState] = useState(true);

  return (
    <Checkbox
      outline={Colors.primary}
      value={checkboxState}
      iconColor={Colors.white}
      iconSouce={(Assets.icons as AssetsIconsType).checkmark}
      containerStyle={{
        backgroundColor: checkboxState
          ? Colors.primary500
          : 'transparent',
        ...(styles as any),
      }}
      onValueChange={(newValue: boolean) => {
        setCheckboxState((prevCheckboxState) => !prevCheckboxState);

        if (onCheckboxChange) {
          onCheckboxChange(newValue);
        }
      }}
    />
  );
}
