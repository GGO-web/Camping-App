import React from 'react';
import { ScrollView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ActivitiesListItem } from './components/ActivitiesListItem';

import { IActivity } from '../../../../models/Activity.model';

function ActivitiesListComponent({ activities }: { activities: IActivity[] }) {
  return (
    <ScrollView>
      {activities.map((activity) => (
        <ActivitiesListItem key={activity.id} activity={activity} />
      ))}
    </ScrollView>
  );
}

export const ActivitiesList = gestureHandlerRootHOC(ActivitiesListComponent);
