import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activitiesReducer } from './activities/activitiesSlice';

import { campingApi } from './api/camping';
import { tripApi } from './api/trip';
import { userApi } from './api/user';
import { notificationApi } from './api/notification';

import { tripReducer } from './trip/tripSlice';

import { userReducer } from './userConfig/userSlice';

const rootReducer = combineReducers({
  userProfile: userReducer,
  trip: tripReducer,
  activities: activitiesReducer,
  [campingApi.reducerPath]: campingApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [tripApi.reducerPath]: tripApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(campingApi.middleware)
    .concat(userApi.middleware)
    .concat(tripApi.middleware)
    .concat(notificationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
