import React from 'react';
import { ScrollView } from 'react-native';

import { ActivitiesListItem } from './components/ActivitiesListItem';

import { IActivity } from '../../../../models/Activity.model';

export function ActivitiesList({ activities }: { activities: IActivity[] }) {
  return (
    <ScrollView>
      {activities.map((activity) => (
        <ActivitiesListItem key={activity.id} activity={activity} />
      ))}
    </ScrollView>
  );
}
