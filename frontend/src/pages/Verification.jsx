import React,{useState} from 'react'
import '../assets/verification.css'
import { Row, Col } from 'react-bootstrap'

const Verification = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
    
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
    const isAllFilled = () =>{
        return verificationCode.every((value) => value !== '');
    }
    if(isAllFilled()){
       
         setTimeout(() => {
              alert(verificationCode.join(''));
         }, 1000);
    }
  return (
    
    <div>
        
        <div className='containerwrap'>
        <form className='formVerification'>
            
            <Row>
                <Row>
                <Col>
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