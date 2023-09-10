import React from 'react'
import { useGetArticlesQuery } from './slices/ArticlesApiSlice'
import {Row, Col, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const App = () => {
  const { data, error, isLoading } = useGetArticlesQuery();
  console.log(data, error, isLoading)

  return (
   <>
  <h1>Articles</h1>
   <Row xs={2} md={4} lg={4}>
    
    {data &&
      data.map((article) => (
        <Col key={article._id}>
          <Link to={`/article/${article._id}`}>
            <h3>{article.title}</h3>
            
          </Link>
          <div dangerouslySetInnerHTML={{__html: article.body}}></div>
        </Col>
      ))
    }

   </Row>
    
   </>
  )
}

export default App