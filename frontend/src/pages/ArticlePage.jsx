import { useGetArticleQuery } from "../slices/ArticlesApiSlice"
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";


const ArticlePage = () => {
    const { id: articleId } = useParams()
    const { data, isLoading, error } = useGetArticleQuery(articleId)

    if (error) return <div>{error}</div>
  return (
    <>
    {
        isLoading && <div>Loading....</div>
    }
    <Row>
        <h1>{data?.title}</h1>
    </Row>
    <Row>
        <Col md={4}>
            <img src={data?.image} alt={data?.title} width="100%" />

        </Col>
         
        <Col md={4}>
            <p>Category: {data?.category}</p>
        </Col>

        <Col md={8}>
            <div dangerouslySetInnerHTML={{ __html: data?.body }}></div>
        </Col>

   </Row>
    
   </>
  )
}

export default ArticlePage