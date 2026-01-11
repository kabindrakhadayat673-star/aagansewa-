import { indexSlice } from "../indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getbranch: builder.query({
      query: () => ({
        url: `/branch/get-Branch`,
        method: "GET",
      }),
      invalidatesTags: ["auth"],
    }),
    deletebranch: builder.mutation({
      query: (branchId) => ({
        url: `/branch/delete-Branch/${branchId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
     getPDB: builder.query({
      query: ({ province_id, district_id }) => {
        const params = new URLSearchParams();
        if (province_id) params.append('province_id', province_id);
        if (district_id) params.append('district_id', district_id);
        return {
          url: `branch/getprovincedistrictbranch?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["branch"],
    }),
  }),
});
export const { useGetbranchQuery, useDeletebranchMutation,useGetPDBQuery } = branchAPIs;
