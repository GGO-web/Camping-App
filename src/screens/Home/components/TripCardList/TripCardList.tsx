import React from 'react';
import { ScrollView } from 'react-native';
import { Assets } from 'react-native-ui-lib';
import { NoResults } from '../../../../components/common/NoResults';

import { AssetsGraphicType } from '../../../../matherialUI';

import { ITripResponse } from '../../../../models/responses/TripResponse';

import { useGetAllTripsQuery } from '../../../../redux/api/trip';

import { TripCard } from '../TripCard/TripCard';

export function TripCardList({ activatedTrip }: { activatedTrip: ITripResponse | undefined }) {
  const { data: trips } = useGetAllTripsQuery();

  return !trips?.length
    ? (
      <NoResults
        image={(Assets.graphic as AssetsGraphicType).trips}
        text="You didn’t add any trips before."
      />
    )
    : (
      <ScrollView
        style={{
          marginVertical: 16,
          marginBottom: 0,
        }}
      >
        {trips?.map((trip: ITripResponse) => (
          <TripCard
            key={trip._id}
            trip={trip}
            activatedTrip={activatedTrip}
          />
        ))}
      </ScrollView>
    );
}
