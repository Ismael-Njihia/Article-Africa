import React, { useState } from 'react';
import { Col, Row, Container, Form, Card, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditArticlePage = () => {
  // State to manage form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    // For example, sending data to a server
    console.log({ title, category, body });
  };

  return (
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
                    <option value="">Select category...</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more categories as needed */}
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
              <Button variant="primary" type="submit">
                Publish Article
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditArticlePage;
