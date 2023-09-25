import { useParams } from "react-router-dom";
import {useGetUserByUsernameQuery} from '../slices/usersApiSlice'
import {useSelector} from 'react-redux'
import '../assets2/profilePage.css'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const {username} = useParams()
    const {userInfo} = useSelector((state) => state.auth)

    const {data: user, isLoading, error} = useGetUserByUsernameQuery(username)
    console.log(user)
   //if no user found
   if(!user){
        return <div>User not found</div>
   }

    if(isLoading) return <div>Loading...</div>

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
      <div className='leftDiv' style={{border:'2px solid white'}}>
        <h4>Articles</h4>
        <h4>{user.articles.length}</h4>
        <div className='categoriesDiv'>
          {user.articles.length === 0 && <div>No articles yet</div>}
          {user.articles.map((article) => (
            <div key={article._id} className='article-container'>
              <div className='article-image' style={{height: "130px", overflow: "hidden"}}>
                <img src={article.image} alt={article.title} style={{width: '100%', height: '100%', objectFit: "cover", objectPosition: "top"}}/>
                </div>
                
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage