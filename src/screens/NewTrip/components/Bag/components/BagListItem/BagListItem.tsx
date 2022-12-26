import React from 'react';
import {
  Stepper, View, Text,
} from 'react-native-ui-lib';

import { InputCheckbox } from '../../../../../../components/InputCheckbox/InputCheckbox';

import { useActions } from '../../../../../../hooks/actions';

import type { IBagItem } from '../../../../../../models/BagItem.model';

export function BagListItem({ bagItem }: { bagItem: IBagItem }) {
  const { updateBagItemCount } = useActions();

  return (
    <View row centerV spread>
      <InputCheckbox />
      <Text paragraph2>{bagItem.content}</Text>

      <Stepper
        value={bagItem.count}
        minValue={1}
        maxValue={Infinity}
        useCustomTheme
        onValueChange={(newValue: number) => {
          updateBagItemCount({
            id: bagItem.id,
            count: newValue,
          });
        }}
      />
    </View>
  );
}
