import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateUniqueID } from '../../helpers/generateUniqueID';

import { IUser } from '../../models/User.model';

import type { IProfileValues } from '../../screens/Profile/Profile.model';

export const initialState: IUser = {
  uid: '',
  fullname: '',
  bio: '',
  avatar: '',
  occupation: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUser>) => {
      state.fullname = action.payload.fullname;
      state.uid = action.payload.uid || generateUniqueID();
    },
    signOut: () => initialState,
    setProfileAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setProfileInfo: (state, action: PayloadAction<IProfileValues>) => {
      state.fullname = action.payload.name;
      state.bio = action.payload.bio;
      state.occupation = action.payload.occupation;
    },
  },
});

export const userSelector = (store: { userProfile: IUser }) => store.userProfile;

export const {
  signIn, signOut, setProfileAvatar, setProfileInfo,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
