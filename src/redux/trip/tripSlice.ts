import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from '../../models/Locations.model';

import { ITrip, ITripPeriod } from '../../models/Trip.model';
import { ITeamMate } from '../../screens/NewTrip/NewTrip.model';

const initialState: ITrip = {
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
    },
    setTripPeriod: (state, action: PayloadAction<ITripPeriod>) => {
      state.tripPeriod = action.payload;
    },
    setTeammates: (state, action: PayloadAction<ITeamMate[]>) => {
      state.teammates = action.payload;
    },
    addLocation: (state, action: PayloadAction<ILocation>) => {
      state.selectedLocations.push(action.payload);
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocations = state.selectedLocations.filter(
        (location: ILocation) => location.id !== action.payload,
      );
    },
    setLatestLocation: (state, action: PayloadAction<string>) => {
      state.latestLocation = action.payload;
    },
    setLatestLocationsList: (state, action: PayloadAction<ILocation[]>) => {
      state.latestLocationsList = action.payload;
    },
    addBagItem: (state, action: PayloadAction<string>) => {
      state.bagItems.push(action.payload);
    },
  },
});

export const {
  addLocation,
  removeLocation,
  setTripName,
  setTripPeriod,
  setTeammates,
  setLatestLocation,
  setLatestLocationsList,
  addBagItem,
} = tripSlice.actions;
export const tripReducer = tripSlice.reducer;
