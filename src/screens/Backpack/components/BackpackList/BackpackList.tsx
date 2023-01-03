import React from 'react';
import { ScrollView } from 'react-native';

import { BackpackListItem } from '../BackpackListItem/BackpackListItem';

import { useAppSelector } from '../../../../redux/hooks';
import { getActivatedTripCollectionItemSelector } from '../../../../redux/tripsCollection/tripsCollection';

export function BackpackList() {
  const bagItems = useAppSelector(getActivatedTripCollectionItemSelector)?.trip.bagItems;

  return (
    <ScrollView>
      {bagItems?.map((bagItem) => (
        <BackpackListItem key={bagItem.id} backpackItem={bagItem} />
      ))}
    </ScrollView>
  );
}
