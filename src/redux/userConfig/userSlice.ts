import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './user.model';
import { generateUniqueID } from '../../helpers/generateUniqueID';

export const initialState: IUser = {
   uid: '',
   email: '',
   fullname: 'User name',
   isAuth: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signIn: (state, action: PayloadAction<IUser>) => {
         state.email = action.payload.email;
         state.fullname = action.payload.fullname;
         state.isAuth = true;
         state.uid = generateUniqueID();
      },
      signOut: () => {
         return initialState;
      },
   },
});

export const userSelector = (store: { userProfile: IUser }) =>
   store.userProfile;

export const { signIn, signOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
