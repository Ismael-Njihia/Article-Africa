import { ARTICLES_URL } from "../constants";
import { UPLOAD_URL } from "../constants";
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
            query: ({ id, title, category, body }) => ({
              url: `${ARTICLES_URL}/${id}`,
              method: 'PUT',
              body: { title, category, body }, // Include all fields you want to update
            }),
            invalidatesTags: ['Articles'],
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
        uploadArticleImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            })
        }),
    }),
})

export const {useGetArticlesQuery,
     useGetArticleQuery, 
     useCreateArticleMutation, 
     useUpdateArticleMutation,
        useGetManyArticlesMutation,
        useUploadArticleImageMutation,
      useDeleteArticleMutation} = articlesApiSlice;
