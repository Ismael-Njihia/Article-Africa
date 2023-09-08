import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style.css';

const Header = () => {
  return (
    <Navbar bg="dark" className='Header' variant="dark" expand="lg" style={{ width: '100%' }}>
      <Navbar.Brand href="#home">Article Africa Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='top-links'>
          <Link to="/article/create">Create Article</Link>
          <Link to="/signup">Signup</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
