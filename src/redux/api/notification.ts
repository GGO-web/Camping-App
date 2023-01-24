import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firebaseAuth } from '../../firebase/firebase';
import { INotification } from '../../models/Notification.model';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/notification`,
  }),
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    getAllNotifications: builder.query<INotification[], void>({
      query: () => ({
        url: `/all/${firebaseAuth.currentUser?.uid}`,
      }),
      providesTags: ['Notification'],
    }),
  }),
});

export const { useGetAllNotificationsQuery } = notificationApi;
