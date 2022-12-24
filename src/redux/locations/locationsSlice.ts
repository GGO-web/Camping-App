import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocation } from '../../models/Locations.model';

const initialState: { selectedLocations: ILocation[] } = {
  selectedLocations: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<ILocation>) => ({
      ...state,
      selectedLocations: [...state.selectedLocations, action.payload],
    }),
    removeLocation: (state, action: PayloadAction<string>) => ({
      ...state,
      selectedLocations: state.selectedLocations.filter(
        (location: ILocation) => location.id !== action.payload,
      ),
    }),
    clearLocations: () => initialState,
  },
});

export const { addLocation, removeLocation } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
