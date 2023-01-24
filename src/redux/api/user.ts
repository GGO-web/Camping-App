import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firebaseAuth } from '../../firebase/firebase';
import { IMessageResponse } from '../../models/responses/MessageResponse';

import IUser from '../../models/User.model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/user`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: `/${firebaseAuth.currentUser?.uid}`,
      }),
      providesTags: ['User'],
    }),
    updateUserAvatar: builder.mutation<IMessageResponse, string>({
      query: (avatar) => ({
        url: '/avatar',
        body: {
          uid: firebaseAuth.currentUser?.uid,
          avatar,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<IMessageResponse, IUser>({
      query: (user) => ({
        url: '/',
        body: {
          ...user,
          uid: firebaseAuth.currentUser?.uid,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} = userApi;
