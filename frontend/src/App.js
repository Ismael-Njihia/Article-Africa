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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '80%' }}>
        
        <Row xs={2} md={4} lg={4}>
          {data &&
            data.map((article) => {
              const text = htmlToText(article.body, {
                wordwrap: false,
                ignoreHref: true,
                ignoreImage: true,
              });
              
              const shortText = text.length > 25 ? text.substring(0,25) + '...' : text; 
              return(
                <Col key={article._id}>
                  <div className="article-container">
                    <Link to={`/article/${article._id}`}>
                      <h3>{article.title}</h3>
                    </Link>
                    <div>{shortText}</div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </div>
      <div style={{ width: '20%', border: '1px solid black' }}>
        {/* Add content for the 20% width div here */}
      </div>
    </div>
    </>
  )
}

export default App
