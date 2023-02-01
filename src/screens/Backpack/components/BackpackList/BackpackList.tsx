import React from 'react';
import { ScrollView } from 'react-native';

import { Text } from 'react-native-ui-lib';
import { BackpackListItem } from '../BackpackListItem/BackpackListItem';

import { useGetBagItemsQuery } from '../../../../redux/api/trip';
import { Loader } from '../../../../components/Loader/Loader';

export function BackpackList() {
  const { data: bagItems } = useGetBagItemsQuery();

  if (bagItems === undefined) {
    return (
      <Loader
        message="Items is fetching from the server, please wait a second..."
      />
    );
  }

  return (
    <ScrollView>
      {bagItems.length ? bagItems?.map((bagItem) => (
        <BackpackListItem key={bagItem.id} backpackItem={bagItem} />
      )) : (
        <Text heading3 marginT-20 center>
          There is no items in your backpack, please add some one
        </Text>
      )}
    </ScrollView>
  );
}
