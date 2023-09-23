import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Form, Card, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useCreateArticleMutation, useUploadArticleImageMutation} from '../slices/ArticlesApiSlice'
import {toast} from 'react-toastify'


const CreateArticlePage = () => {
  // State to manage form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('')
  const [imageCaption, setImageCaption] = useState('')

  const navigate = useNavigate()

  const [createArticle, {isLoading: loadingCreate}] = useCreateArticleMutation()
  const [uploadArticleImage, {isLoading: loadingUpload}] = useUploadArticleImageMutation()

  const uploadFileHandler = async(e) =>{
    const formData = new FormData();
    formData.append('image', e.target.files[0])

    try {
      const res = await uploadArticleImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error.message)
    }

  }

  const createProductHandler = async() =>{
    if(window.confirm('Are you sure you want to publish this Article?')){
      try{
        const result = await createArticle({title, category, body, image, imageCaption})
        console.log(result)
       //check forarticle is created
        if(result.error){
          toast.error(result.error.data.message)
          return
        }else{
        toast.success('Article Published Successfully')
        //reset the text areas
        setTitle('')
        setCategory('')
        setBody('')
        setImage('')

        //navigate to response article Id
        navigate(`/article/${result.data._id}`)
        
        }
        
      }catch(error){
        toast.error(error.message)
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

    <Container className="mt-5">
      <h3 style={{textAlign: 'center'}}>Publish an Article for Article Africa</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{height: '1050px'}}>
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
                {/*Image Input Placeholder */}

                <Form.Group controlId="image">
                <Form.Label>Upload Article Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  disabled
                > 
                </Form.Control>
                <br/>
                <Form.Control
                  type="file"
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                >

                </Form.Control>
              </Form.Group>
              <br/>
              <Form.Group controlId="imageCaption">
                  <Form.Label>Image Caption</Form.Label>
                  <Form.Control

                    type="text"
                    placeholder="Enter image caption"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
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
            <Button variant="primary" className= "sm" onClick={createProductHandler} type="submit" block disabled={loadingCreate}>
                    Publish Article
                  </Button>
              
            
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CreateArticlePage;
