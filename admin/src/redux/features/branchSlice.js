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
  }),
});
export const { useGetbranchQuery, useDeletebranchMutation } = branchAPIs;
