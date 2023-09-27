import React from 'react'
import { useGetArticlesQuery } from '../slices/ArticlesApiSlice';
import { useGetCategoriesQuery } from '../slices/CategoryApiSlice';
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { htmlToText } from 'html-to-text';
import '../App.css'


const Homepage = () => {
    const { data, error, isLoading } = useGetArticlesQuery();
    const {data: categories, error: articleError, isLoading: articleIsLoading} = useGetCategoriesQuery();
    console.log(categories)
    console.log(data, error, isLoading)
    if (isLoading) return <div>Loading...</div>
  return (
    <>
    <div className='appContainer' >
      <div className='leftDiv'>
        
        <Row xs={1} md={3} lg={4}>
          {data &&
            data.map((article) => {
              //Parse the HTML content to find and replace image links
              const parsedBody = article.body.replace(
                /<img src="([^"]+)" alt="([^"]+)"(.*?)>/g,
                (match, src, alt) =>`<img src=${src} alt=${alt} style="width:70%;height:auto;"/>`
              )


              const text = htmlToText(parsedBody, {
                wordwrap: false,
                ignoreHref: true,
                ignoreImage: true,
              });
              
              const shortText = text.length > 25 ? text.substring(0,55) + '...' : text; 
              return(
                <Col key={article._id}>
                  <div className="article-container" style={{marginBottom: '10px'}}>
                    {/*Render the Image coming from the backend */}
                    <div className="article-image" style={{height: "130px", overflow: "hidden"}}>
                      <img src={article.image} alt={article.title} style={{width: '100%', height: '100%', objectFit: "cover", objectPosition: "top"}}/>
                    </div>
                    <Link to={`/article/${article._id}`}>
                     {article.title.length > 25 ? <p className='articleTitleSmall'>{article.title.substring(0,37) + '...'}</p>: <p>{article.title}</p>}
                    </Link>
                    <div className='shortArticleText'>{shortText}</div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
      <div className='rightDiv'>
        {articleIsLoading && <div>Loading...</div>}
        <h4>Topics</h4>

        <div className='categoriesDiv'>
          {categories &&
            categories.map((category) => {
              return(
                <div key={category._id}>
                  <Link to={`/category/${category.name}`}>
                    <h5 className='categoryLinks'>{category.name}</h5>
                  </Link>
                </div>
              )

            })
          }
        </div>
        
        
      </div>
    </div>
    </>
  )
}

export default Homepage