import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../slices/CategoryApiSlice';
import {useGetManyArticlesMutation} from '../slices/ArticlesApiSlice';
import '../App.css'

const CategoryPage = () => {

    const { name } = useParams()
    const { data: categoriesData, error: gettingCategoryError, isLoading: categoryLoading } = useGetCategoryQuery(name);
   
    const [articles, setArticles] = useState([]);
    console.log(articles)

    //sending array of article ids to getManyArticles
    const [getManyArticles, {data: articleData, error: gettingArticleError, isLoading: articleLoading}] = useGetManyArticlesMutation();
    //avoid re rendering
    useEffect(()=>{
      if(articles) {
        const articleIds = articles.map(article => article)
        getManyArticles(articleIds)
      }
    }, [getManyArticles, articles])
    
    //see the data I am sending


    console.log(articleData)
    console.log(gettingArticleError)

    
    useEffect(()=>{
      if(categoriesData && categoriesData.articles.length > 0) {
        setArticles(categoriesData.articles)
    }
    }, [categoriesData])

    if(categoryLoading) return <div>Loading...</div>

    if(gettingCategoryError) return <div>Error getting category</div>

    if(categoriesData && categoriesData.articles.length === 0) return <div>No articles found in this Category</div>
    
    if(articleLoading) return <div>Loading articles...</div>

  return (
    <>
    
    <div className='appContainer'>
      <h1>{name}</h1>
      <div className='leftDiv'>
        {articleData && articleData.map(article => {
          return (
            <div key={article._id}>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
            </div>
          )
        })}

      </div>
      <div className='rightDiv'>

      </div>
    </div>
    </>
  )
}

export default CategoryPage