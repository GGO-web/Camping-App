import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { v4 } from 'uuid';

import { IActivity } from '../../models/Activity.model';

const initialState: { activities: IActivity[] } = {
  activities: [],
};

const activitiesSlice = createSlice({
  initialState,
  name: 'Activities',
  reducers: {
    addActivity: (state, action: PayloadAction<IActivity>) => {
      state.activities.push({
        ...action.payload,
        id: v4(),
      });
    },
  },
});

export const { addActivity } = activitiesSlice.actions;
export const activitiesReducer = activitiesSlice.reducer;
