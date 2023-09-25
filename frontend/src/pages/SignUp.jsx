import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {useRegisterMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice'
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [register, {isLoading}] = useRegisterMutation()

  const {userInfo} = useSelector((state)=> state.auth)

  useEffect(()=>{
    if(userInfo){
      navigate('/login')
    }
  }, [userInfo, navigate])
  const handleFullName = (e) => {
    setName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await register({name, email, password}).unwrap();
      console.log(res)
      dispatch(setCredentials({...res}))
      navigate('/login')
      
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.error)

    }
  };

  return (
   <>
   {
    isLoading && <div>Loading.... </div>
   }
    
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
                    value={name}
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
