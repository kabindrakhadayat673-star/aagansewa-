import { indexSlice } from "../indexSlice";


export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/auth-login`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `/auth/auth-logout`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["auth"],
    }),
    getManager: builder.query({
      query: () => ({
        url: `/auth/get-managers`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    addManager: builder.mutation({
      query: (data) => ({
        url: `/auth/add-manager`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    editManager: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/edit-manager/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/auth/delete-manager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});
export const {useLoginMutation,useLogoutMutation,useGetManagerQuery,useAddManagerMutation,useEditManagerMutation,useDeleteManagerMutation}=authAPIs;
