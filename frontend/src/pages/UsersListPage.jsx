import React from 'react'
import {useSelector} from 'react-redux'


const UsersListPage = () => {
    const {userInfo} = useSelector(state => state.auth)

    console.log(userInfo.isAdmin)
  return (
    <div></div>
  )
}

export default UsersListPage