import {Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    let auth = {'token': true}
  return (
    auth.token ? <Outlet /> : <Navigate to="/login" replace={true} />
    
  )
}

export default PrivateRoute