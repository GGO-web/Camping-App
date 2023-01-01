import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
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
        completed: false,
      });
    },
    removeActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter((activity) => activity.id !== action.payload);
    },
    setCompletedActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.map((activity) => (
        activity.id === action.payload ? {
          ...activity,
          completed: true,
        } : activity
      ));
    },
  },
});

export const { addActivity, removeActivity, setCompletedActivity } = activitiesSlice.actions;
export const activitiesReducer = activitiesSlice.reducer;
