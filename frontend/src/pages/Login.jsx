 import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/article/create';

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }

  }, [userInfo, redirect, navigate])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }; 

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const res = await login({email, password}).unwrap();
    dispatch(setCredentials({...res,}))
    navigate(redirect)
    
   } catch (error) {
      toast.error(error?.data?.message || error?.data?.error)
    
   }

    
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
                <Button variant="primary" type="submit" disabled={isLoading} block>
                  Login
                </Button>
                {
                  isLoading && <div>Loading...</div>
                }
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
