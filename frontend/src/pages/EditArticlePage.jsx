import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card, Button } from 'react-bootstrap';

import { useParams, useNavigate } from "react-router-dom"
import { useUpdateArticleMutation } from "../slices/ArticlesApiSlice";
import { useGetArticleQuery } from '../slices/ArticlesApiSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components2/Spinner';

const EditArticlePage = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate()

    const [updateArticle, {isLoading: loadingCreate, error: updatingError}] = useUpdateArticleMutation()
    const {data: article, isLoading, error} = useGetArticleQuery(id)
    console.log(article)
    //pre fill with data

    useEffect(()=>{
        if(article){
            setTitle(article.title || '')
            setCategory(article.category.name || '')
            setBody(article.body || '')
        }
    }, [article])
    
    const updateArticlehandler = async () => {
      if (window.confirm("Are you sure you want to update this article?")) {
        try {
          const updatedArticleData = {
            id, 
            title,
            category, // Assuming category is the category ID
            body,
          };
    
          const result = await updateArticle(updatedArticleData);
          console.log(result, 'result')
    
          if (result.error) {
            toast.error(result.error.message);
          } else {
            toast.success('Article Updated Successfully');
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    
    

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
  return (
    <>
    {
      isLoading && <div className='spinnerDiv'> <Spinner/> </div>
    }
    {
      error && toast.error(error.message)
    }
    {
      updatingError && toast.error(updatingError.message)
    }
    <Container className="mt-5">
      <h3 style={{textAlign: 'center'}}>Publish an Article for Article Africa</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{height: '850px'}}>
            <Card.Body>
              
              <Form>
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
                <Form.Group controlId="title">
                <Form.Label>If you have an Image inside the Article render it using HTML</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='<img src="https://images.unsplash.com/photo-161" alt="Article Image" />'
                  disabled
                />
              </Form.Group>
               <br/>



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
            <Button variant="primary" className= "sm" onClick={updateArticlehandler} type="submit" block disabled={loadingCreate}>
                    Save Changes
                  </Button>
              
            
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default EditArticlePage