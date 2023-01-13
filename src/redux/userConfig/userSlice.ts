import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './user.model';
import { generateUniqueID } from '../../helpers/generateUniqueID';
import type { IProfileValues } from '../../screens/Profile/Profile.model';

export const initialState: IUser = {
  uid: '',
  email: '',
  fullname: '',
  bio: '',
  isAuth: false,
  avatar: '',
  occupation: '',
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
