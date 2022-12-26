import React, { useState } from 'react';
import { Assets, Checkbox, Colors } from 'react-native-ui-lib';
import { AssetsIconsType } from '../../matherialUI';

export function InputCheckbox() {
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
      }}
      onValueChange={() => {
        setCheckboxState((prevCheckboxState) => !prevCheckboxState);
      }}
    />
  );
}
