import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../slices/CategoryApiSlice';
import {useGetManyArticlesMutation} from '../slices/ArticlesApiSlice';
import { useGetCategoriesQuery } from '../slices/CategoryApiSlice';
import '../App.css'

import {Link} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import Spinner from '../components2/Spinner';

const CategoryPage = () => {

    const { name } = useParams()
    const { data: categoriesData, error: gettingCategoryError, isLoading: categoryLoading } = useGetCategoryQuery(name);
    //get all categories
    const {data: allCategories, isLoading: allCategoriesLoading} = useGetCategoriesQuery();
   
    const [articles, setArticles] = useState([]);
    

    //sending array of article ids to getManyArticles
    const [getManyArticles, {data: articleData, error: gettingArticleError, isLoading: articleLoading}] = useGetManyArticlesMutation();
    //avoid re rendering
    useEffect(()=>{
      if(articles) {
        const articleIds = articles.map(article => article)
        getManyArticles(articleIds)
      }
    }, [getManyArticles, articles])
    
    useEffect(()=>{
      if(categoriesData && categoriesData.articles.length > 0) {
        setArticles(categoriesData.articles)
    }
    }, [categoriesData])

    if(categoryLoading) return <div className='spinnerDiv'> <Spinner/> </div>

    if(gettingCategoryError) return <div>Error getting category</div>

    if(categoriesData && categoriesData.articles.length === 0) return <div>No articles found in this Category</div>
    
    if(articleLoading) return <div className='spinnerDiv'> <Spinner/> </div>

  return (
    <>
    <div className="appContainer">
    
      <div className="leftDiv">
        <Row xs={2} md={3} lg={4}>
          
          {
            articleData && articleData.map((article) => {
              return(
                <div key={article._id} className="article-container" style={{marginBottom: '10px'}}>
                  {/*Render the Image coming from the backend */}
                  <div className="article-image" style={{height: "130px", overflow: "hidden"}}>
                    <img src={article.image} alt={article.title} style={{width: '100%', height: '100%', objectFit: "cover", objectPosition: "top"}}/>
                  </div>
                  <Link to={`/article/${article._id}`}>
                    {article.title.length > 25 ? <p className='articleTitleSmall'>{article.title.substring(0,37) + '...'}</p>: <p>{article.title}</p>}
                  </Link>
                </div>
              )
            })
          }

        </Row>

      </div>
      <div className="rightDiv">
        {allCategoriesLoading && <div>Loading...</div>}
        <div className='categoriesDiv'>
          {allCategories &&
            allCategories.map((category) => (
              <div key={category._id}>
                {category.name === name ? (
                  <h5 className='categoryInit'>{category.name}</h5>
                ) : (
                  <Link to={`/category/${category.name}`}>
                    <h5 className='categoryLinks'>{category.name}</h5>
                  </Link>
                )}
              </div>
            ))}
        </div>

              
      </div>
    </div>
    
   </>
  )
}

export default CategoryPage