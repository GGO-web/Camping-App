import React from 'react';
import { ScrollView } from 'react-native';

import { BackpackListItem } from '../BackpackListItem/BackpackListItem';

import { useGetBagItemsQuery } from '../../../../redux/api/trip';

export function BackpackList() {
  const { data: bagItems } = useGetBagItemsQuery();

  return (
    <ScrollView>
      {bagItems?.map((bagItem) => (
        <BackpackListItem key={bagItem.id} backpackItem={bagItem} />
      ))}
    </ScrollView>
  );
}
