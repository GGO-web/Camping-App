import React from 'react';
import { ScrollView } from 'react-native';
import { teammatesList } from '../../../../constants';
import { IUser } from '../../../../models/User.model';

import { TeammatesListItem } from '../TeammatesListItem/TeammatesListItem';

export function TeammatesList() {
  const teammates: IUser[] = teammatesList;

  return (
    <ScrollView>
      {teammates.map((teammate) => <TeammatesListItem key={teammate.uid} teammate={teammate} />)}
    </ScrollView>
  );
}
