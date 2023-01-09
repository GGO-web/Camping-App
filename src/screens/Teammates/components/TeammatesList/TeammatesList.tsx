import React from 'react';
import { ScrollView } from 'react-native';
import { teammatesList } from '../../../../constants';
import { ITeamMate } from '../../../../models/Teammate.model';
import { TeammatesListItem } from '../TeammatesListItem/TeammatesListItem';

export function TeammatesList() {
  const teammates: ITeamMate[] = teammatesList;

  return (
    <ScrollView>
      {teammates.map((teammate) => <TeammatesListItem key={teammate.id} teammate={teammate} />)}
    </ScrollView>
  );
}
