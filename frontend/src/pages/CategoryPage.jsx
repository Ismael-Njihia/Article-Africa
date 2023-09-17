import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../slices/CategoryApiSlice';
import {useGetArticleQuery} from '../slices/ArticlesApiSlice'

const CategoryPage = () => {

    const { name } = useParams()
    const { data: categoriesData, error: gettingCategoryError, isLoading: categoryLoading } = useGetCategoryQuery(name);
   
    const [articles, setArticles] = useState([]);

    const { data: articleData, error: gettingArticleError, isLoading: articleLoading } = useGetArticleQuery(articles[0]);
    console.log(articleData)

    
    useEffect(()=>{
      if(categoriesData && categoriesData.articles.length > 0) {
        setArticles(categoriesData.articles)
    }
    }, [categoriesData])

    

    if(categoryLoading) return <div>Loading...</div>

    if(gettingCategoryError) return <div>Error getting category</div>

    if(categoriesData && categoriesData.articles.length === 0) return <div>No articles found in this Category</div>
    console.log(articles)

  return (
    <div>{name}</div>
  )
}

export default CategoryPage