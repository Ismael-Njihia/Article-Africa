const generateVerificationCode = ()=> {
    const code = Math.floor(Math.random() * 900000) + 100000; 
    return code.toString(); 
}

export default generateVerificationCode;