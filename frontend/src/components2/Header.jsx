import '../assets2/header.css'
import {FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaBars, FaSearch} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import {useState} from 'react'

import { useGetCategoriesQuery} from '../slices/CategoryApiSlice'
import { NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [searchModal, setSearchModal] = useState(false)

  const {data: categories, error: categoryError, isLoading: categoryIsLoading} = useGetCategoriesQuery();

  const handleModalOpen = () =>{
    setShowModal(true)
  }

  const handleModalClose = () =>{
    setShowModal(false)
  }

  const handleSearchModalOpen = () =>{
    setSearchModal(true)
  }

  const handleSearchModalClose = () =>{
    setSearchModal(false)
  }


  const {userInfo } = useSelector((state) => state.auth)
  
  const [logoutMutation] = useLogoutMutation()

  const logoutHandler = async () => {
    try{
      await logoutMutation()
      dispatch(logout())
      navigate('/signup')

    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
     <div className='top'>
         <div className='topLeft'>
          {userInfo &&(
           <span className='topListItem'> Hi {userInfo.name}</span> 
          )}

         
         
{userInfo ? (
  <NavDropdown className='topListItem'> 
    <div className="profiledropdownHolder">
    <Link to={`/profile/${userInfo.username}`}>
      <div>
        <NavDropdown.Item>Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </div>
    </Link>
    </div>
  </NavDropdown>
) : (
<div  className="articleAfricaLogo">
  <Link to='/' className='topListItem'>
    <h5 className='logoName'>Article Africa</h5>
    </Link>
</div>
)}
       {userInfo && userInfo.isAdmin && (
            <NavDropdown className='topListItem'>
              <LinkContainer to='/admin/users'>

                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/articles'>
                <NavDropdown.Item>Articles</NavDropdown.Item>     
              </LinkContainer>
            </NavDropdown>
          )}
    
        
          
         </div>
         <div className='topCenter'>
            <ul className='topList'>
                
                <Link to="/" className='topListItem'>HOME</Link>
                <Link to="/about" className='topListItem'>ABOUT</Link>
               <Link to="/contact" className='topListItem'>CONTACT</Link>
            </ul>

         </div>
         <div className='topRight'>
              <FaFacebookSquare className='topIcon' />
                <FaInstagramSquare className='topIcon' />
                <FaLinkedin className='topIcon' />
                <FaTwitterSquare className='topIcon' />
               
        </div>
        {/*search Icon */}
        <div style={{marginLeft: '10px', border: "0.5px solid #ccc",display:"flex",justifyContent:'center', padding: "5px"}} className='topFarRight'>
            <FaSearch className='topIcon' onClick={handleSearchModalOpen} />
        </div>
        <div className='topFarRight'>
            <FaBars className='topIcon' onClick={handleModalOpen}/>
        </div>
        {/* Modal */}

        <Modal 
        show={showModal} 
        onHide={handleModalClose} 
        dialogClassName="modal-75w"
        backdrop="static"
        onClick={handleModalClose}
        >
          <Modal.Header className="modal-header" closeButton>
           <div className='modal-header'> <Link to='/'>Home</Link> </div>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {/*Check if categories are loading */}
            {categoryIsLoading && <div>Loading...</div>}
            <h4>Topics</h4>
            <div className='categoriesDiv'>
              {categories &&
                categories.map((category) => {
                  return(
                    <div key={category._id}>
                      <Link to={`/category/${category.name}`}>
                        <h5 className='categoryLinks'>{category.name}</h5>
                      </Link>
                    </div>
                  )

                })
              }
            </div>

           </Modal.Body>
           <Modal.Footer className="modal-footer">
            {/*display About and Contact Link */}
            <Link to='/about' className="modal-footer-links" >ABOUT</Link>
            <Link to='/contact' className="modal-footer-links" >CONTACT</Link>
            </Modal.Footer>
          </Modal>

          {/* Search Modal */}

          <Modal
          show={searchModal}
          onHide={handleSearchModalClose}
          dialogClassName="modal-75w"
          backdrop="static"
        
          >
            <Modal.Header  closeButton>
              <div>Search Articles</div>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div className='searchDiv'>
                <input type='text' placeholder='Search...' className='searchInput'/>
                <button className='searchButton'>Search</button>
              </div>
            </Modal.Body>
          </Modal>
          
        
     </div>
    </>
  )
}

export default Header