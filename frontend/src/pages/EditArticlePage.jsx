import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import Header from '../components/Header';

const EditArticlePage = () => {
  // State to manage form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  
  //load the categories using axios
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        const categoryName = response.data.map((category) => category.name);
        setCategories(categoryName);
      } catch (error) {
        if (error.response) {
          console.error('Request failed with status code:', error.response.status);
          alert(`Request failed with status code: ${error.response.status}`);
        } else {
          console.error('Error:', error.message);
          alert(`Error: ${error.message}`);
        }
      }
    };
  
    fetchCategories();
  }, []);
  
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      title,
      category,
      body,
    }; 
    // Post article to backend
    axios
      .post('/api/articles', articleData)
      .then((response) => {
        alert('Article published successfully');
        setTitle('');
        setCategory('');
        setBody('');
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message)
      });
  };

  return (
    <>
    <Header/>
    <Container className="mt-5">
      <h3 style={{textAlign: 'center'}}>Publish an Article for Article Africa</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{height: '700px'}}>
            <Card.Body>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Article Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                <br />

                <Form.Group controlId="category">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <br />

                <Form.Group controlId="body">
                  <Form.Label>Article Body</Form.Label>
                  <ReactQuill
                   style={{height: '400px'}}
                    value={body}
                    onChange={setBody}
                    theme="snow" // You can change the theme if needed
                  />
                </Form.Group>
                   <br />
              </Form>
              
            </Card.Body>
            <br />
            <Card.Footer>
              <Button variant="primary" onClick={handleSubmit} type="submit">
                Publish Article
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default EditArticlePage;
