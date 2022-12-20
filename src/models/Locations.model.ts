import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export interface ILocation {
  id: string;
  name: string;
  description: string;
  images: Array<{
    title: string;
    altText: string;
    url: string;
    [key: string]: any;
  }>,
  [key: string]: any;
}

export interface ILocationResponse {
  data: Array<ILocation>,
  [key: string]: any;
}
