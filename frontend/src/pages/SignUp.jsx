import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';


const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFullName = (e) => {
    setFullName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server)
   
  };

  return (
   <>
      <Header />
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Sign up A New writer</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter your Full name"
                    value={fullName}
                    onChange={handleFullName}
                    required
                  />
                </Form.Group>
                <br/>

              

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmail}
                    required
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="Password">
                  <Form.Label> Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                </Form.Group>
                <br/>

               

                <Button variant="primary" type="submit" block>
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
    
  );
};

export default SignUp;
