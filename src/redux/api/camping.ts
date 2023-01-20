import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ILocationResponse } from '../../models/responses/LocationResponse';

export const campingApi = createApi({
  reducerPath: 'campingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  tagTypes: ['Camping'],
  endpoints: (builder) => ({
    getCampingPlaces: builder.query<
    ILocationResponse,
    { name: string; limit?: number }
    >({
      query: ({ name, limit = 20 }) => ({
        url: `${process.env.REACT_APP_CAMPING_BASE_URL}?q=${name}&limit=${limit}&api_key=${process.env.REACT_APP_CAMPING_API_KEY}`,
      }),
      providesTags: ['Camping'],
    }),
    checkoutTripImage: builder.query<any, { imageURL: string }>({
      query: ({ imageURL }) => ({
        url: imageURL,
      }),
      providesTags: ['Camping'],
    }),
  }),
});

export const { useLazyGetCampingPlacesQuery, useLazyCheckoutTripImageQuery } = campingApi;
