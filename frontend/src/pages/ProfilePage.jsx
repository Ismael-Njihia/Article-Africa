import { useParams } from "react-router-dom";
import {useGetUserByUsernameMutation} from '../slices/usersApiSlice'


import { toast } from "react-toastify";
const ProfilePage = () => {
    const {username} = useParams()

    const {data: user, isLoading, error} = useGetUserByUsernameMutation(username)

   if (user === undefined) {
        toast.error("User not found");
   }

    if(isLoading) return <div>Loading...</div>

  return (

    <>
    
        {username}
    </>
  )
}

export default ProfilePage