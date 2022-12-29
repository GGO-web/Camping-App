import React from 'react';
import { ScrollView } from 'react-native';

import { useAppSelector } from '../../../../redux/hooks';

import { TripCard } from '../TripCard/TripCard';

export function TripCardList() {
  const trips = useAppSelector((store) => store.tripsCollection.trips);

  return (
    <ScrollView
      style={{
        marginVertical: 16,
        marginBottom: 0,
      }}
    >
      {trips.map((tripCollectionItem) => (
        <TripCard
          key={tripCollectionItem.trip.tripId}
          isActivated={tripCollectionItem.activated}
          trip={tripCollectionItem.trip}
        />
      ))}
    </ScrollView>
  );
}
