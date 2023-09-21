import { useParams } from "react-router-dom";
import {useGetUserByUsernameQuery} from '../slices/usersApiSlice'


import { toast } from "react-toastify";
const ProfilePage = () => {
    const {username} = useParams()

    const {data: user, isLoading, error} = useGetUserByUsernameQuery(username)
   //if no user found
   if(!user){
        return <div>User not found</div>
   }

    if(isLoading) return <div>Loading...</div>

  return (

    <>
    {
      isLoading && <div>Loading...</div>
    }
    {
      error && toast.error(error)
    }
        {username}
    </>
  )
}

export default ProfilePage