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
  }),
});
export const {useLoginMutation,useLogoutMutation}=authAPIs;
