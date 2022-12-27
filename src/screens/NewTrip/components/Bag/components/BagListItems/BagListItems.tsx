import React from 'react';
import { ScrollView } from 'react-native';

import { useAppSelector } from '../../../../../../redux/hooks';

import type { IBagItem } from '../../../../../../models/BagItem.model';

import { BagListItem } from '../BagListItem/BagListItem';

export function BagListItems() {
  const bagItems = useAppSelector((store) => store.trip.bagItems);

  return (
    <ScrollView>
      {bagItems.map(
        (bagItem: IBagItem) => (
          <BagListItem
            key={bagItem.id}
            bagItem={bagItem}
          />
        ),
      )}
    </ScrollView>
  );
}
