import React from 'react';

import { View } from 'react-native-ui-lib';
import { useAppSelector } from '../../../../../../redux/hooks';

import type { IBagItem } from '../../../../../../models/BagItem.model';

import { BagListItem } from '../BagListItem/BagListItem';

export function BagListItems() {
  const bagItems = useAppSelector((store) => store.trip.bagItems);

  return (
    <View>
      {bagItems.map(
        (bagItem: IBagItem) => (
          <BagListItem
            key={bagItem.id}
            bagItem={bagItem}
          />
        ),
      )}
    </View>
  );
}
