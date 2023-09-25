import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import {useGetUserByUsernameQuery} from '../slices/usersApiSlice'
import {useSelector} from 'react-redux'
import '../assets2/profilePage.css'
import { toast } from "react-toastify";
import {useGetManyArticlesMutation} from '../slices/ArticlesApiSlice';
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

const ProfilePage = () => {
  const { username } = useParams()
  const { userInfo } = useSelector((state) => state.auth)
  const [articles, setArticles] = useState([]); // State to store articles

  const { data: user, isLoading, error } = useGetUserByUsernameQuery(username)

  // useEffect to set the articles
  useEffect(() => {
      if (user && user.articles && user.articles.length > 0) {
          setArticles(user.articles);
      }
  }, [user]);

 
    const [getManyArticles, {data: articleData, error: gettingArticleError, isLoading: articleLoading}] = useGetManyArticlesMutation();

    if(articleData){
      console.log(articleData.image)
    }
    //send array of article ids to getManyArticles

    useEffect(()=>{
      if(articles){
        const articlesIds = articles.map(article => article)
        getManyArticles(articlesIds)
      }
    }, [getManyArticles, articles])

 
    
    //if no user found
   if(!user){
        return <div>User not found</div>
   }

    if(isLoading){
     return <div>Loading...</div>
    }

    if(error) {
      return <div>Error getting user</div>
    }

    if(articleLoading){ 
      return <div>Loading articles...</div>  
    }

    if(gettingArticleError){ 
      return <div>Error getting articles</div>
    }


  //set the articles


  return (
    <>
    <div className='appContainer' >
      <div className='rightDiv'>
        <div className='profileContainer'>
          <div className='profileImage'>
            <img src={user.image} alt={user.name} style={{width: '100%', height: '100%', objectFit: "cover", objectPosition: "top"}}/>
          </div>
          <div className='profileName'>{user.name}</div>
          <div className='profileUsername'>@{user.username}</div>
          <div className='profileBio'>{user.bio}</div>
          {/**Check the user logged in and display Edit button */}
          {userInfo && userInfo.username === user.username && (
            <div className='profileEditButton'>
              <button onClick={() => toast('Edit profile')}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
      <div className='leftDiv'>
        <h4 className="myArticles">My Articles</h4>
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
    </div>
    </>
  )
}

export default ProfilePage