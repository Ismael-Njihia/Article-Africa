
import { MASSEMAILER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const massEmailerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        sendEmail: builder.mutation({
            query: (data) => ({
                url: MASSEMAILER_URL,
                method: 'POST',
                body: data
            })
        }),
    }),
})
 
export const {useSendEmailMutation} = massEmailerApiSlice;