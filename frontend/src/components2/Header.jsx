import '../assets2/header.css'
import {FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare} from 'react-icons/fa'

const Header = () => {
  return (
    <>
     <div className='top'>
         <div className='topLeft'>
         <li className='topListItem'>Article Africa!</li>
           
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
     </div>
    </>
  )
}

export default Header