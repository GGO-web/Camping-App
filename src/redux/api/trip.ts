import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { firebaseAuth } from '../../firebase/firebase';
import { IBagItem } from '../../models/BagItem.model';

import { IAddBagItemRequest } from '../../models/requests/AddBagItemRequest';
import { IMessageResponse } from '../../models/responses/MessageResponse';
import { ITripResponse } from '../../models/responses/TripResponse';

import { ITrip } from '../../models/Trip.model';

export const tripApi = createApi({
  reducerPath: 'tripApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Trip'],
  endpoints: (builder) => ({
    getAllTrips: builder.query<ITripResponse[], void>({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/all/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    getActivatedTrip: builder.query<ITripResponse, void>({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/activated/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    createTrip: builder.mutation<any, ITrip>({
      query: (trip) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/create`,
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          locations: trip.selectedLocations,
          ...trip,
        } as ITripResponse,
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
    completeTrip: builder.mutation<IMessageResponse, void>({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/complete/${firebaseAuth?.currentUser?.uid}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    setActivatedTrip: builder.mutation<IMessageResponse, string>({
      query: (tripId) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/activate`,
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          tripId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    // Trip Bag endpoints
    getBagItems: builder.query<IBagItem[], void>({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/bag/all/${firebaseAuth?.currentUser?.uid}`,
      }),
      providesTags: ['Trip'],
    }),
    createBagItem: builder.mutation<IMessageResponse, IAddBagItemRequest>({
      query: ({ tripId, bagItem }) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/bag/${tripId}`,
        body: bagItem,
        method: 'POST',
      }),
      invalidatesTags: ['Trip'],
    }),
    updateBagItemImage: builder.mutation<IMessageResponse, { bagItemId: string; image: string }>({
      query: ({ bagItemId, image }) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/bag/image`,
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          bagItemId,
          image,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
    updateBagItemCount: builder.mutation<IMessageResponse, { bagItemId: string; count: number }>({
      query: ({ bagItemId, count }) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/trip/bag/count`,
        body: {
          userId: firebaseAuth?.currentUser?.uid,
          bagItemId,
          count,
        },
        method: 'PATCH',
      }),
      invalidatesTags: ['Trip'],
    }),
  }),
});

export const {
  useCreateTripMutation,
  useCompleteTripMutation,
  useGetAllTripsQuery,
  useGetActivatedTripQuery,
  useSetActivatedTripMutation,
  // Trip Bag hooks
  useGetBagItemsQuery,
  useCreateBagItemMutation,
  useUpdateBagItemImageMutation,
  useUpdateBagItemCountMutation,
} = tripApi;
