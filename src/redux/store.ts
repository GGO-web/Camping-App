import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userConfig/userSlice';

const rootReducer = combineReducers({
   userProfile: userReducer,
});

export const store = configureStore({
   reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
