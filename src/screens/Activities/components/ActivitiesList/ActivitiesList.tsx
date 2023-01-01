import React from 'react';
import { ScrollView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ActivitiesListItem } from './components/ActivitiesListItem';

import { useAppSelector } from '../../../../redux/hooks';

function ActivitiesListComponent() {
  const activities = useAppSelector((store) => store.activities.activities);

  return (
    <ScrollView>
      {activities.map((activity) => (
        <ActivitiesListItem key={activity.id} activity={activity} />
      ))}
    </ScrollView>
  );
}

export const ActivitiesList = gestureHandlerRootHOC(ActivitiesListComponent);
