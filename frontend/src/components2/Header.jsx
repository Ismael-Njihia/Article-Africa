import '../assets2/header.css'
import {FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaBars} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'

import { NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)
  const [logoutMutation] = useLogoutMutation()

  const logoutHandler = async () => {
    try{
      await logoutMutation()
      dispatch(logout())
      navigate('/login')

    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
     <div className='top'>
         <div className='topLeft'>
         {
      userInfo? (
        <NavDropdown className='topListItem'> 
          <NavDropdown.Item>Hi {userInfo.name}</NavDropdown.Item>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
      ):(
        <li className='topListItem'>Article Africa!</li>
      )
    }
        
           
         </div>
         <div className='topCenter'>
            <ul className='topList'>
                <li className='topListItem'>HOME</li>
                <li className='topListItem'>ABOUT</li>
                <li className='topListItem'>CONTACT</li>
            </ul>

         </div>
         <div className='topRight'>
              <FaFacebookSquare className='topIcon' />
                <FaInstagramSquare className='topIcon' />
                <FaLinkedin className='topIcon' />
                <FaTwitterSquare className='topIcon' />
               
        </div>
        <div className='topFarRight'>
            <FaBars className='topIcon' />
        </div>
     </div>
    </>
  )
}

export default Header