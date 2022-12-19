import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { campingApi } from './api/camping';
import { userReducer } from './userConfig/userSlice';

const rootReducer = combineReducers({
   userProfile: userReducer,
   [campingApi.reducerPath]: campingApi.reducer
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(campingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
