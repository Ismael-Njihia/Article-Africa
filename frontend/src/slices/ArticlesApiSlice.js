import { ARTICLES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const articlesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getArticles: builder.query({
            query: () => ARTICLES_URL,
            providesTags: ['Articles']
        }),
        getArticle: builder.query({
            query: (id) => `${ARTICLES_URL}/${id}`,
            providesTags: ['Articles']
        }),
        createArticle: builder.mutation({
            query: (data) => ({
                url: ARTICLES_URL,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['Articles']
        }),
        updateArticle: builder.mutation({
            query: ({id, body}) => ({
                url: `${ARTICLES_URL}/${id}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Articles']
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `${ARTICLES_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles']
        }),
        //get many articles by Id so receiveing array of ids
        getManyArticles: builder.mutation({
            query: (ids) => ({
                url: `${ARTICLES_URL}/many`,
                method: 'POST',
                body: {ids}
            })
        }),
    }),
})

export const {useGetArticlesQuery,
     useGetArticleQuery, 
     useCreateArticleMutation, 
     useUpdateArticleMutation,
        useGetManyArticlesMutation,
      useDeleteArticleMutation} = articlesApiSlice;
