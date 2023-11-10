import { VERIFICATION_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const verificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verify: builder.mutation({
            query: (data) => ({
                url: `${VERIFICATION_URL}`,
                method: 'POST',
                body:data,
            })
        }),
    }),
   
  
});

export const {
    useVerifyMutation,
   
} = verificationApiSlice;