import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { firebaseAuth } from '../../firebase/firebase';
import { IMessageResponse } from '../../models/responses/MessageResponse';
import { IUser } from '../../models/User.model';

export const teammatesApi = createApi({
  reducerPath: 'teammatesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/trip/teammates`,
  }),
  tagTypes: ['Teammates'],
  endpoints: (builder) => ({
    getAllTeammates: builder.query<IUser[], void>({
      query: () => ({
        url: `/all/${firebaseAuth.currentUser?.uid}`,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Teammates'],
    }),
    addTeammate: builder.mutation<IMessageResponse, string>({
      query: (teammateId) => ({
        url: '/add',
        method: 'POST',
        body: {
          userId: firebaseAuth.currentUser?.uid,
          teammateId,
        },
      }),
      invalidatesTags: ['Teammates'],
    }),
    deleteTeammate: builder.mutation<IMessageResponse, string>({
      query: (teammateId) => ({
        url: `/delete?userId=${firebaseAuth.currentUser?.uid}&teammateId=${teammateId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teammates'],
    }),
  }),
});

export const {
  useGetAllTeammatesQuery,
  useAddTeammateMutation,
  useDeleteTeammateMutation,
} = teammatesApi;
