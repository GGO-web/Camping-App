import React from 'react';
import { ScrollView } from 'react-native';

import { ActivitiesListItem } from './components/ActivitiesListItem';

import { IActivity } from '../../../../models/Activity.model';
import { Loader } from '../../../../components/Loader/Loader';

export function ActivitiesList({ activities }: { activities: IActivity[] }) {
  if (activities === undefined) {
    return (
      <Loader
        message="Activities is fetching from the server, please wait a second..."
      />
    );
  }

  return (
    <ScrollView>
      {activities.map((activity) => (
        <ActivitiesListItem key={activity.id} activity={activity} />
      ))}
    </ScrollView>
  );
}
