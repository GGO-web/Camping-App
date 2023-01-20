import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { activitiesReducer } from './activities/activitiesSlice';
import { campingApi } from './api/camping';
import { userApi } from './api/user';

import { tripReducer } from './trip/tripSlice';
import { tripsCollectionReducer } from './tripsCollection/tripsCollection';

import { userReducer } from './userConfig/userSlice';

const rootReducer = combineReducers({
  userProfile: userReducer,
  trip: tripReducer,
  tripsCollection: tripsCollectionReducer,
  activities: activitiesReducer,
  [campingApi.reducerPath]: campingApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(campingApi.middleware)
    .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
