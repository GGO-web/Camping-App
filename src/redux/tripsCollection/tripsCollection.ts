import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ITrip } from '../../models/Trip.model';

import type { ITripCollection } from './tripsCollection.model';

const initialState: ITripCollection = {
  trips: [],
};

const tripsCollectionSlice = createSlice({
  name: 'tripsCollection',
  initialState,
  reducers: {
    addNewTripToCollection: (state, action: PayloadAction<ITrip>) => {
      state.trips.push({
        trip: action.payload,
        activated: true,
      });

      state.trips = state.trips.map(
        (tripsCollectionItem) => (tripsCollectionItem.trip.tripId === action.payload.tripId ? ({
          ...tripsCollectionItem,
          activated: true,
        }) : ({
          ...tripsCollectionItem,
          activated: false,
        })),
      );
    },
    setActivedTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map(
        (tripsCollectionItem) => (tripsCollectionItem.trip.tripId === action.payload ? ({
          ...tripsCollectionItem,
          activated: true,
        }) : ({
          ...tripsCollectionItem,
          activated: false,
        })),
      );
    },
  },
});

export const {
  addNewTripToCollection,
  setActivedTrip,
} = tripsCollectionSlice.actions;
export const tripsCollectionReducer = tripsCollectionSlice.reducer;
