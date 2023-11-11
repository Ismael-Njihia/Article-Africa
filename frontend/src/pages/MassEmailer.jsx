import React,{useState} from 'react'
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import { useSendEmailMutation } from '../slices/massEmailerApiSlice';
import {toast} from 'react-toastify'

const MassEmailer = () => {
    const[subject,setSubject] = useState('')
    const[message,setMessage] = useState('')
    const[sendmassEmail, {isLoading: loadingSend}] = useSendEmailMutation()


    const sendEmail = async(e) =>{
        e.preventDefault()
        try {
            const res = await sendmassEmail({subject, message})
            toast.success(res.data.message)
            setSubject('')
            setMessage('')
            console.log(res)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


  return (
    <>
    <Container className='mt-5'>
        <h3 style={{textAlign: 'center'}}>Send a Mass Email</h3>
        <Row className='justify-content-center'>
            <Col md={8}>
                <Card style={{height: '430px'}}>
                    {loadingSend && <h3>sending...</h3>}
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Subject</Form.Label>
                                <Form.Control type='text' placeholder='Enter the subject' value={subject} onChange={e => setSubject(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Message</Form.Label>
                                <Form.Control as='textarea' rows={10} value={message} onChange={e => setMessage(e.target.value)} />
                            </Form.Group>
                            <Button variant='primary' type='submit' onClick={sendEmail}>Send Email</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    </Container>
    </>
  )
}

export default MassEmailer