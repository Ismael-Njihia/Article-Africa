import { USERS_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body:data,
            }),
            invalidatesTags: ['Users']
        }),
        getUsers: builder.query({
            query: ()=>({
                url: `${USERS_URL}`,
            })
        }),
        logout: builder.mutation({
            query: `${USERS_URL}/logout}`,
            method: 'POST',
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        }),
        getUserDetailsByEmail: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        })
    }),
   
  
})

export const {
    useGetUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetUserDetailsByEmailMutation,
    useLogoutMutation
} = usersApiSlice;

