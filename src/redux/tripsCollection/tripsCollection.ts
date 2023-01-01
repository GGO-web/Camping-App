import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import type { ITrip } from '../../models/Trip.model';
import type { ITripCollection, ITripCollectionItem } from './tripsCollection.model';
import { IActivity } from '../../models/Activity.model';
import { RootState } from '../store';

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
        activities: [],
        activated: true,
      });

      state.trips = state.trips.map((tripsCollectionItem) => (tripsCollectionItem.trip.tripId === action.payload.tripId
        ? {
          ...tripsCollectionItem,
          activated: true,
        }
        : {
          ...tripsCollectionItem,
          activated: false,
        }));
    },
    setActivedTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map((tripsCollectionItem) => (tripsCollectionItem.trip.tripId === action.payload
        ? {
          ...tripsCollectionItem,
          activated: true,
        }
        : {
          ...tripsCollectionItem,
          activated: false,
        }));
    },
    addActivity: (state, action: PayloadAction<IActivity>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          activities: [
            ...tripCollectionItem.activities,
            {
              ...action.payload,
              id: v4(),
              completed: false,
            },
          ],
        }
        : tripCollectionItem));
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          activities: tripCollectionItem.activities.filter(
            (activity) => activity.id !== action.payload,
          ),
        }
        : tripCollectionItem));
    },
    setCompletedActivity: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          activities: tripCollectionItem.activities.map((activity) => (activity.id === action.payload
            ? {
              ...activity,
              completed: true,
            }
            : activity)),
        }
        : tripCollectionItem));
    },
  },
});

export const {
  addNewTripToCollection,
  setActivedTrip,
  addActivity,
  removeActivity,
  setCompletedActivity,
} = tripsCollectionSlice.actions;
export const tripsCollectionReducer = tripsCollectionSlice.reducer;

export const getActivatedTripCollectionItemSelector = (
  store: RootState,
) => store.tripsCollection.trips.find(
  (tripCollectionItem) => tripCollectionItem.activated,
);
