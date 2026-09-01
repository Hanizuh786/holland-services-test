
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const hlsApi = createApi({
  reducerPath: 'hlsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api' }),
  endpoints: builder => ({
    getSiteContent: builder.query({ query: () => '/content' }),
    submitContact: builder.mutation({ query: body => ({ url: '/contact', method: 'POST', body }) })
  })
});
export const { useGetSiteContentQuery, useSubmitContactMutation } = hlsApi;
