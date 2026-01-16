import { indexSlice } from "./indexSlice";

export const branchAPIs =indexSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDistricts: builder.query({
            query: ()=> ({
                url: `/branch/get-district`,
                method: "GET",

            }),
            providesTags:["district"],

            
        })
    })
});

export const {useGetDistrictsQuery}=branchAPIs;