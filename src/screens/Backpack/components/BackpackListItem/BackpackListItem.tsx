import React from 'react';
import {
  View, Text, Stepper, Button, Colors, Icon,
} from 'react-native-ui-lib';

import { useActions } from '../../../../hooks/actions';

import { IBagItem } from '../../../../models/BagItem.model';

export function BackpackListItem({ backpackItem }: { backpackItem: IBagItem }) {
  const { updateBackpackItemCount } = useActions();

  return (
    <View marginB-16 row centerV spread>
      <View row centerV>
        <Button
          mode="contained"
          backgroundColor={Colors.gray}
          disabledBackgroundColor={Colors.gray400}
          marginR-16
          style={{
            minWidth: 48,
            width: 48,
            height: 48,
            borderRadius: 16,
          }}
        >
          <Icon
            size={24}
            style={{
              resizeMode: 'cover',
            }}
            assetName="plus"
          />
        </Button>

        <Text style={{ width: '100%', maxWidth: 160 }} heading4 numberOfLines={2}>
          {backpackItem.content}
        </Text>
      </View>

      <View flex right>
        <Stepper
          value={backpackItem.count}
          minValue={1}
          maxValue={Infinity}
          useCustomTheme
          onValueChange={(newValue: number) => {
            updateBackpackItemCount({
              id: backpackItem.id,
              count: newValue,
            });
          }}
        />
      </View>
    </View>
  );
}
