import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firebaseAuth } from '../../firebase/firebase';

import { IFeedback } from '../../models/Feedback.model';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/feedback`,
  }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query<IFeedback[], void>({
      query: () => ({
        url: '/all',
      }),
      providesTags: ['Feedback'],
    }),
    getUserFeedbacks: builder.query<IFeedback[], void>({
      query: () => ({
        url: `/${firebaseAuth.currentUser?.uid}`,
      }),
      providesTags: ['Feedback'],
    }),
    createFeedback: builder.mutation<IFeedback, string>({
      query: (message) => ({
        url: '/create',
        method: 'POST',
        body: {
          userId: firebaseAuth.currentUser?.uid,
          message,
        },
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation<IFeedback, IFeedback>({
      query: (feedbackId) => ({
        url: `delete?userId=${firebaseAuth.currentUser?.uid}&feedbackId=${feedbackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useGetAllFeedbacksQuery,
  useGetUserFeedbacksQuery,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
