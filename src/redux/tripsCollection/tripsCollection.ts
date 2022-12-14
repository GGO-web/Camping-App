import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import type { ITrip } from '../../models/Trip.model';
import type { ITripCollection } from './tripsCollection.model';
import type { IActivity } from '../../models/Activity.model';
import type { RootState } from '../store';
import { IBagItem } from '../../models/BagItem.model';

const initialState: ITripCollection = {
  trips: [],
};

const tripsCollectionSlice = createSlice({
  name: 'tripsCollection',
  initialState,
  reducers: {
    addNewTripToCollection: (state, action: PayloadAction<ITrip>) => {
      state.trips.push({
        trip: {
          ...action.payload,
          bagItems: action.payload.bagItems.filter((bagItem) => bagItem.checked),
        },
        activities: [],
        activated: true,
      });

      state.trips = state.trips.map(
        (tripsCollectionItem) => (
          tripsCollectionItem.trip.tripId === action.payload.tripId
            ? {
              ...tripsCollectionItem,
              activated: true,
            }
            : {
              ...tripsCollectionItem,
              activated: false,
            }),
      );
    },
    setActivedTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map(
        (tripsCollectionItem) => (
          tripsCollectionItem.trip.tripId === action.payload
            ? {
              ...tripsCollectionItem,
              activated: true,
            }
            : {
              ...tripsCollectionItem,
              activated: false,
            }),
      );
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
          activities: tripCollectionItem.activities.map(
            (activity) => (
              activity.id === action.payload
                ? {
                  ...activity,
                  completed: true,
                }
                : activity),
          ),
        }
        : tripCollectionItem));
    },
    addBackpackItem: (state, action: PayloadAction<IBagItem>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          trip: {
            ...tripCollectionItem.trip,
            bagItems: [...tripCollectionItem.trip.bagItems, action.payload],
          },
        }
        : tripCollectionItem));
    },
    updateBackpackItemCount: (state, action: PayloadAction<{ id: string, count: number }>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          trip: {
            ...tripCollectionItem.trip,
            bagItems: tripCollectionItem.trip.bagItems.map((bagItem) => (
              bagItem.id === action.payload.id ? {
                ...bagItem,
                count: action.payload.count,
              } : bagItem)),
          },
        }
        : tripCollectionItem));
    },
    setBackpackItemUri: (state, action: PayloadAction<{ id: string, uri: string }>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          trip: {
            ...tripCollectionItem.trip,
            bagItems: tripCollectionItem.trip.bagItems.map((bagItem) => (
              bagItem.id === action.payload.id ? {
                ...bagItem,
                imageUri: action.payload.uri,
              } : bagItem)),
          },
        }
        : tripCollectionItem));
    },
    addNewSnap: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.map((tripCollectionItem) => (tripCollectionItem.activated
        ? {
          ...tripCollectionItem,
          snaps: [
            ...tripCollectionItem.snaps || [],
            {
              id: v4(),
              uri: action.payload,
            },
          ],
        }
        : tripCollectionItem));
    },
    destroyTrip: (state) => {
      state.trips = state.trips.filter((tripsCollectionItem) => !tripsCollectionItem.activated);

      // set latest trip activated after deletion
      state.trips = state.trips.map(
        (tripsCollectionItem, index) => (
          index === state.trips.length - 1
            ? {
              ...tripsCollectionItem,
              activated: true,
            }
            : {
              ...tripsCollectionItem,
              activated: false,
            }),
      );
    },
    leaveActivatedTrip: (state) => {
      state.trips = state.trips.map(
        (tripsCollectionItem) => (
          tripsCollectionItem.activated
            ? {
              ...tripsCollectionItem,
              activated: false,
            }
            : tripsCollectionItem
        ),
      );
    },
  },
});

export const {
  addNewTripToCollection,
  setActivedTrip,
  addActivity,
  removeActivity,
  setCompletedActivity,
  addBackpackItem,
  updateBackpackItemCount,
  setBackpackItemUri,
  addNewSnap,
  destroyTrip,
  leaveActivatedTrip,
} = tripsCollectionSlice.actions;
export const tripsCollectionReducer = tripsCollectionSlice.reducer;

export const getActivatedTripCollectionItemSelector = (
  store: RootState,
) => store.tripsCollection.trips.find(
  (tripCollectionItem) => tripCollectionItem.activated,
);
