import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUser } from '../../models/User.model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<IUser, string>({
      query: (userId) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`,
        method: 'get',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useLazyGetUserByIdQuery } = userApi;
