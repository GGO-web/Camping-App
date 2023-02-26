import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { firebaseAuth } from '../../firebase/firebase';
import { IActivity } from '../../models/Activity.model';
import { IBagItem } from '../../models/BagItem.model';
import { IAddActivityRequest } from '../../models/requests/AddActivityRequest';

import { IAddBagItemRequest } from '../../models/requests/AddBagItemRequest';
import { IMessageResponse } from '../../models/responses/MessageResponse';
import { ITripResponse } from '../../models/responses/TripResponse';
import { ISnap } from '../../models/Snap.model';

import { ITrip } from '../../models/Trip.model';

export const tripApi = createApi({
  reducerPath: 'tripApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/`,
  }),
  tagTypes: ['Trip'],
  endpoints: (builder) => ({
    getAllTrips: builder.query<ITripResponse[], void>({
      query: () => ({
        url: `trip/all/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    getActivatedTrip: builder.query<ITripResponse, void>({
      query: () => ({
        url: `trip/activated/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    createTrip: builder.mutation<
    any,
    Omit<ITrip, 'latestLocationsList' | 'latestLocation'>
    >({
      query: (trip) => ({
        url: 'trip/create',
        body: {
          ...trip,
          userId: firebaseAuth?.currentUser?.uid,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
    completeTrip: builder.mutation<IMessageResponse, void>({
      query: () => ({
        url: `trip/complete/${firebaseAuth?.currentUser?.uid}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    setActivatedTrip: builder.mutation<IMessageResponse, string>({
      query: (tripId) => ({
        url: 'trip/activate',
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          tripId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    deactivateTrip: builder.mutation<IMessageResponse, void>({
      query: () => ({
        url: `trip/deactivate/${firebaseAuth?.currentUser?.uid}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    deleteTrip: builder.mutation<IMessageResponse, string>({
      query: (tripId) => ({
        url: `trip/delete?userId=${firebaseAuth?.currentUser?.uid}&tripId=${tripId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Trip'],
    }),
    // Trip Bag endpoints
    getBagItems: builder.query<IBagItem[], void>({
      query: () => ({
        url: `bag/all/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    createBagItem: builder.mutation<IMessageResponse, IAddBagItemRequest>({
      query: ({ tripId, bagItem }) => ({
        url: `bag/${tripId}`,
        body: {
          ...bagItem,
          userId: firebaseAuth?.currentUser?.uid,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
    updateBagItemImage: builder.mutation<
    IMessageResponse,
    { bagItemId: string; image: string }
    >({
      query: ({ bagItemId, image }) => ({
        url: 'bag/image',
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          bagItemId,
          image,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    updateBagItemCount: builder.mutation<
    IMessageResponse,
    { bagItemId: string; count: number }
    >({
      query: ({ bagItemId, count }) => ({
        url: 'bag/count',
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          bagItemId,
          count,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    deleteBagItem: builder.mutation<IMessageResponse, string>({
      query: (bagItemId) => ({
        url: `bag/delete?userId=${firebaseAuth?.currentUser?.uid}&bagItemId=${bagItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Trip'],
    }),
    // trip activity endpoints
    getAllActivities: builder.query<IActivity[], void>({
      query: () => ({
        url: `activity/all/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    createActivity: builder.mutation<IMessageResponse, IAddActivityRequest>({
      query: (activityBody) => ({
        url: `activity/${firebaseAuth?.currentUser?.uid}`,
        body: activityBody,
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
    completeActivity: builder.mutation<IMessageResponse, string>({
      query: (activityId) => ({
        url: 'activity/complete',
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          activityId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    deleteActivity: builder.mutation<IMessageResponse, string>({
      query: (activityId) => ({
        url: `activity/delete?userId=${firebaseAuth?.currentUser?.uid}&activityId=${activityId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Trip'],
    }),
    // trip snaps endpoints
    getAllSnaps: builder.query<ISnap[], void>({
      query: () => ({
        url: `snaps/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    takeSnap: builder.mutation<IMessageResponse, string>({
      query: (snapImage) => ({
        url: 'snaps/create',
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          image: snapImage,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
  }),
});

export const {
  useCreateTripMutation,
  useCompleteTripMutation,
  useGetAllTripsQuery,
  useLazyGetActivatedTripQuery,
  useGetActivatedTripQuery,
  useSetActivatedTripMutation,
  useDeactivateTripMutation,
  useDeleteTripMutation,
  // Trip Bag hooks
  useGetBagItemsQuery,
  useCreateBagItemMutation,
  useUpdateBagItemImageMutation,
  useUpdateBagItemCountMutation,
  useDeleteBagItemMutation,
  // Trip Activities hooks
  useGetAllActivitiesQuery,
  useCreateActivityMutation,
  useCompleteActivityMutation,
  useDeleteActivityMutation,
  // Trip Snaps hooks
  useGetAllSnapsQuery,
  useTakeSnapMutation,
} = tripApi;
