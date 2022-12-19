import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ILocationResponse } from '../../screens/NewTrip/components/Locations/Locations.model';

export const campingApi = createApi({
   reducerPath: 'campingApi',
   baseQuery: fetchBaseQuery({
      baseUrl: ''
   }),
   endpoints: (builder) => ({
      getCampingPlaces: builder.query<ILocationResponse, { name: string; limit: number }>({
         query: ({ name, limit = 1 }) => ({
            url: `${process.env.REACT_APP_CAMPING_BASE_URL}?q=${name}&limit=${limit}&api_key=${process.env.REACT_APP_CAMPING_API_KEY}`
         })
      }),
   }),
})

export const { useGetCampingPlacesQuery } = campingApi;
