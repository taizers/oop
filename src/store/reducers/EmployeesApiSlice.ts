import { apiSlice } from '../api/apiSlice';

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
      }),
      providesTags: ['Employee'],
    }),
    getEmployees: builder.query({
      query: ({ page, limit, query }) => ({
        url: `/employees?page=${page}&limit=${limit}&query${query}`,
      }),
      providesTags: ['Employee'],
    }),
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: `/employees`,
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, employee }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: { ...employee },
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});
