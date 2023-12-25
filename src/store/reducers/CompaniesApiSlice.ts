import { apiSlice } from '../api/apiSlice';

export const companiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => ({
        url: '/companies/all',
      }),
      providesTags: ['Company'],
    }),
    getCompany: builder.query({
      query: (id) => ({
        url: `/companies/${id}`,
      }),
      providesTags: ['Company'],
    }),
    getCompanies: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/companies?page=${page}&limit=${limit}&query=${query}`,
      }),
      providesTags: ['Company'],
    }),
    createCompany: builder.mutation({
      query: (company) => ({
        url: `/companies`,
        method: 'POST',
        body: company,
      }),
      invalidatesTags: ['Company'],
    }),
    updateCompany: builder.mutation({
      query: ({ id, company }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: { ...company },
      }),
      invalidatesTags: ['Company'],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'],
    }),
  }),
});
