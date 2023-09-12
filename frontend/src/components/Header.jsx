import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style.css';



const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" className='Header' variant="dark" expand="lg" style={{ width: '100%' }}>
        <Navbar.Brand href="#home">Article Africa Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='top-links'>
            <Link to="/article/create">Create Article</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{color: 'white'}}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className='flex-column'>
            <Link to="/article/create" onClick={handleClose}>Create Article</Link>
            <Link to="/signup" onClick={handleClose}>Signup</Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
