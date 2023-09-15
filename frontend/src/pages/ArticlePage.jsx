import { useGetArticleQuery } from "../slices/ArticlesApiSlice";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import he from "he";
import '../assets2/articlePage.css'

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(articleId);
  console.log(data);

  const formatCreatedAt = (createdAt) =>{
    const options ={
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric"
    }
    return new Date(createdAt).toLocaleDateString(undefined, options)
  }

  if (error) return <div>{error}</div>;
  if (data) {
    const { title, category, body, postedBy,createdAt } = data;

    const parsedBody = he.decode(body);
    const formattedCreatedAt = formatCreatedAt(createdAt)

    return (
      <>
        <Row className="articleTitle">
          <h4>{title}</h4>
        </Row>
        <Row>
          <Col md={8}>
            {/* Left div with 80% width */}
            <div className="ArticleDiv" dangerouslySetInnerHTML={{ __html: parsedBody }}></div>
          </Col>

          <Col md={4}>
            {/* Right div with 20% width */}
            <div className="detailDiv">
              <p>Category: {category.name}</p>
              <p>Posted By: {postedBy.name}</p>
             <p>On: {formattedCreatedAt}</p>
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ArticlePage;
