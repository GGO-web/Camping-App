import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 } from 'uuid';

import { IBagItem } from '../../models/BagItem.model';

import { ILocation } from '../../models/Locations.model';
import { ITeamMate } from '../../models/Teammate.model';

import { ITrip, ITripPeriod } from '../../models/Trip.model';

const initialState: ITrip = {
  tripId: '',
  tripName: '',
  tripPeriod: {
    startDate: '',
    endDate: '',
    formatted: '',
  },
  teammates: [],
  selectedLocations: [],
  latestLocation: '',
  latestLocationsList: [],
  bagItems: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTripName: (state, action: PayloadAction<string>) => {
      state.tripName = action.payload;
      state.tripId = v4();
    },
    setTripPeriod: (state, action: PayloadAction<ITripPeriod>) => {
      state.tripPeriod = action.payload;
    },
    setTeammates: (state, action: PayloadAction<ITeamMate[]>) => {
      state.teammates = action.payload;
    },
    addLocation: (state, action: PayloadAction<ILocation>) => {
      const locationAlreadyInStorage = state.selectedLocations.some(
        (location) => location.id === action.payload.id,
      );

      if (!locationAlreadyInStorage) {
        state.selectedLocations.push(action.payload);
      }
    },
    setLatestLocation: (state, action: PayloadAction<string>) => {
      state.latestLocation = action.payload;
    },
    setLatestLocationsList: (state, action: PayloadAction<ILocation[]>) => {
      state.latestLocationsList = action.payload;
    },
    addBagItem: (state, action: PayloadAction<IBagItem>) => {
      state.bagItems.push(action.payload);
    },
    updateBagItemCount: (state, action: PayloadAction<{ id: string, count: number }>) => {
      state.bagItems = state.bagItems.map((bagItem) => (
        bagItem.id === action.payload.id ? {
          ...bagItem,
          count: action.payload.count,
        } : bagItem));
    },
    toggleBagItemChecked: (state, action: PayloadAction<string>) => {
      state.bagItems = state.bagItems.map((bagItem) => (
        bagItem.id === action.payload ? {
          ...bagItem,
          checked: !bagItem.checked,
        } : bagItem));
    },
    clearTripFormInfo: (state) => (
      state = {
        ...initialState,
        teammates: state.teammates,
        latestLocation: state.latestLocation,
        latestLocationsList: state.latestLocationsList,
      }
    ),
    setActiveTrip: (state, action: PayloadAction<ITrip>) => (
      state = action.payload
    ),
  },
});

export const {
  addLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
  updateBagItemCount,
  toggleBagItemChecked,
  clearTripFormInfo,
  setActiveTrip,
} = tripSlice.actions;
export const tripReducer = tripSlice.reducer;
