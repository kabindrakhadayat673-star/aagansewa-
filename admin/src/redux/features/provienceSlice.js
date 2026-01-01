import { indexSlice } from "../indexSlice";

const provienceApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProvience: builder.query({
      query: () => ({
        url: `branch/get-provience`,
        method: "GET",
      }),
      providesTags: ["provience"],
    }),

    addprovience: builder.mutation({
      query: (data) => ({
        url: `branch/add-provience`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["provience"],
    }),

    updateprovience: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `branch/update-provience/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["provience"],
    }),

    deleteprovience: builder.mutation({
      query: (data) => ({
        url: `branch/delete-provience/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["provience"],
    }),
  }),
});
export const {
  useAddprovienceMutation,
  useUpdateprovienceMutation,
  useDeleteprovienceMutation,
  useGetProvienceQuery,
} = provienceApi;
