import React from 'react';
import { ScrollView } from 'react-native';
import { Loader } from '../../../../components/Loader/Loader';

import { useGetAllTeammatesQuery } from '../../../../redux/api/teammates';

import { TeammatesListItem } from '../TeammatesListItem/TeammatesListItem';

export function TeammatesList() {
  const { data: teammates, isLoading } = useGetAllTeammatesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView>
      {teammates?.map((teammate) => <TeammatesListItem key={teammate.uid} teammate={teammate} />)}
    </ScrollView>
  );
}
