import React from 'react';
import {
  View, Text, Colors,
} from 'react-native-ui-lib';

import { InputCheckbox } from '../../../../../../components/InputCheckbox/InputCheckbox';
import { Stepper } from '../../../../../../components/Stepper/Stepper';

import { useActions } from '../../../../../../hooks/actions';

import type { IBagItem } from '../../../../../../models/BagItem.model';

export function BagListItem({ bagItem }: { bagItem: IBagItem }) {
  const { updateBagItemCount, toggleBagItemChecked } = useActions();

  return (
    <View marginB-16 row top spread>
      <InputCheckbox
        onCheckboxChange={() => {
          toggleBagItemChecked(bagItem.id as string);
        }}
        styles={{ marginTop: 2, marginRight: 5 }}
      />

      <Text style={{ width: '100%', maxWidth: 180 }} paragraph2>{bagItem.description}</Text>

      <View right style={{ minWidth: 130 }}>
        <Stepper
          value={bagItem.count}
          minValue={1}
          maxValue={Infinity}
          onValueChange={(newValue: number) => {
            updateBagItemCount({
              id: bagItem.id as string,
              count: newValue,
            });
          }}
          buttonControlsStyles={{
            backgroundColor: Colors.primary,
          }}
          buttonControlsIconStyles={{
            tintColor: Colors.white,
          }}
        />
      </View>
    </View>
  );
}
