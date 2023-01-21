import React from 'react';
import { ScrollView } from 'react-native';
import { ITripResponse } from '../../../../models/responses/TripResponse';

import { TripCard } from '../TripCard/TripCard';

export function TripCardList({ trips }: { trips: ITripResponse[] }) {
  return (
    <ScrollView
      style={{
        marginVertical: 16,
        marginBottom: 0,
      }}
    >
      {trips?.map((trip: ITripResponse) => (
        <TripCard
          key={trip.tripId}
          isActivated={!!trip.activated}
          trip={trip}
        />
      ))}
    </ScrollView>
  );
}
