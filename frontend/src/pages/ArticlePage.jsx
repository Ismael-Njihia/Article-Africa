import { useGetArticleQuery } from "../slices/ArticlesApiSlice";
import { useDeleteArticleMutation } from "../slices/ArticlesApiSlice";

import { useParams, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import he from "he";
import '../assets2/articlePage.css';
import {useSelector} from 'react-redux'
import { toast } from "react-toastify";

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const { data, isLoading, error } = useGetArticleQuery(articleId);
  
  const {userInfo} = useSelector(state => state.auth)
  const navigate = useNavigate()

 const  deleteBtnHandler = () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(articleId);
      //check if the article is deleted
    }
  }

  const EditBtnHandler = () => {
    navigate(`/article/edit/${articleId}`)
  }

  

  const [deleteArticle,{data: deleteResponse, error: deletingError, isLoading: deleteLoading}] = useDeleteArticleMutation();

  if(deleteResponse){
    toast.success('Article deleted successfully')
    navigate('/')
  }
  if(deletingError){
    toast.error(deletingError)
  }
  if (deleteLoading) return <div>Deleting...</div>

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
            {/**Check if the aricle has Image If Yes, displa */}
            {data.image && (
              <div className="ArticleDiv">
              <div className="article-image tipsadjust"
              style={{height: "300px", overflow: "hidden"}}
              >
                <img 
                src={data.image} 
                alt={data.title} 
                style={{width: '100%', height: '100%', objectFit: "cover", objectPosition: '50% 27%'}}
                />
              </div>
              <div className="article-caption">
                <p className="captionParagraph">{data.imageCaption}</p>
              </div>
              </div>
            )}
            {/* Left div with 80% width */}
            <div className="ArticleDiv article-content" dangerouslySetInnerHTML={{ __html: parsedBody }}></div>
          </Col>

          <Col md={4}>
            {/* Right div with 20% width */}
            <div className="detailDiv">
              <p>Category: {category.name}</p>
             {/* Addd a link to the name using the username */}
              <p>Posted By: <a href={`/profile/${postedBy.username}`}>{postedBy.name}</a></p>
              
             <p>On: {formattedCreatedAt}</p>
            </div>

            <div className="DeleteandEdit">
              {userInfo && (userInfo._id === postedBy._id || userInfo.isAdmin) && (
                <div className="ButtonsOp">
                  <button 
                  className="btn btn-light"
                  onClick={deleteBtnHandler}
                  >
                    Delete</button>

                  <button 
                  className="btn btn-light"
                  onClick={EditBtnHandler}
                  >
                    Edit</button>
                </div>
              )
              }
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
