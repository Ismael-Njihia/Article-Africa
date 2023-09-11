import React from 'react'
import { useGetArticlesQuery } from './slices/ArticlesApiSlice'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { htmlToText } from 'html-to-text';

import './App.css'

/*Components*/
import Header from './components2/Header'

const App = () => {
  const { data, error, isLoading } = useGetArticlesQuery();
  console.log(data, error, isLoading)

  return (
    <>
    <Header />
    <div className='appContainer' >
      <div className='leftDiv'>
        
        <Row xs={2} md={3} lg={4}>
          {data &&
            data.map((article) => {
              const text = htmlToText(article.body, {
                wordwrap: false,
                ignoreHref: true,
                ignoreImage: true,
              });
              
              const shortText = text.length > 25 ? text.substring(0,45) + '...' : text; 
              return(
                <Col key={article._id}>
                  <div className="article-container" style={{marginBottom: '20px', marginRight:'10px'}}>
                    <Link to={`/article/${article._id}`}>
                      <h4>{article.title}</h4>
                    </Link>
                    <div>{shortText}</div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
      <div className='rightDiv'>
        {/* Add content for the 20% width div here */}
      </div>
    </div>
    </>
  )
}

export default App
