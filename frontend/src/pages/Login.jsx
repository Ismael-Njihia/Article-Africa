import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    axios.post('/api/users/login', loginData)
    .then((response) =>{
        setEmail('');
        setPassword('');
        navigate('/article/create')

    }).catch((error) => {
        alert(error.response.data.message)
    })
    
  };

  return (
    <Container fluid>
     
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col xs={12} md={6} lg={4}>
        <h4 style={{textAlign: 'center'}}>Article Africa (AA) Writer's Account</h4>
        <br />
          <Card>
            <Card.Body>
              <h2 className="text-center">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>

                <br />
                <Button variant="primary" type="submit" block>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
