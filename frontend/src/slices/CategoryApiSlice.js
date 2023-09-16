import { CATEGORIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getCategories: builder.query({
            query: () => CATEGORIES_URL,
            providesTags: ['Categories']
        }),
        getCategory: builder.query({
            query: (id) => `${CATEGORIES_URL}/${id}`,
            providesTags: ['Categories']
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: CATEGORIES_URL,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['Categories']
        })
    }),
    
})
export const {useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation} = categoriesApiSlice;