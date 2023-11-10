import React,{useState, useEffect, useCallback} from 'react'
import '../assets/verification.css'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useVerifyMutation } from '../slices/verificationApiSlice'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
    const navigate = useNavigate();
    const [verify, { isLoading, error }] = useVerifyMutation();
    const [verificationAttempted, setVerificationAttempted] = useState(false);

    const {userInfo} = useSelector((state) => state.auth)
    const email = userInfo.email
    const isVerified = userInfo.isVerified
     
    console.log(isVerified)
    if(isVerified){
        navigate('/')
    }
   
    const handleChange = (index, value) =>{
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        //move the focus to the next box when one box is filled
        if(index !== 5 && value !== ''){
            document.getElementsByName('verificationCode')[index+1].focus();
        }

        //move the focus to the previous box when the backspace is pressed
        if(index !== 0 && value === ''){
            document.getElementsByName('verificationCode')[index-1].focus();
        }
    }
    //check if all the six boxes are filled
    const isAllFilled = useCallback(() =>{
        return verificationCode.every((value) => value !== '');
    }, [verificationCode])

    // if(isAllFilled()){
       
    //      setTimeout(() => {
    //           alert(verificationCode.join(''));
    //      }, 1000)
         
    // }
    
    //check if is loading
    useEffect(() => {
        if (error && verificationAttempted) {
            console.log(error)
            setVerificationAttempted(false)
        }
        if(isAllFilled() && !verificationAttempted){
            verify({email, verificationCode: verificationCode.join('')})
            .unwrap()
            .then((data) => {
                toast.success(data.message)
                navigate('/article/create')
            })
            .catch((err) => {
                toast.error(err.data.message)
                setVerificationAttempted(true)
            })
        }
      

    },[verificationCode, error, navigate, verify, email, isAllFilled, verificationAttempted])
  return (
    
    <div>
        
        <div className='containerwrap'>
        <form className='formVerification'>
            
            <Row>
                <Row>
                <Col>
                {/** show loader */}
                {isLoading && <p>Verifying...</p>}
                    <h5>Verification</h5>
                    <p>Please enter the verification code sent to your email</p>
                </Col>
                </Row>
                <Col>
                {verificationCode.map((value, index) => (
                    <input
                    className='inputVerification'
                    key={index}
                    type="text"
                    name="verificationCode"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    //focus on the next box when one box is filled
                    onFocus={(e) => e.target.select()}
                    
                    />
                ))}
            </Col>
            </Row>
            
        </form>
        </div>
    </div>
  )
}

export default Verification