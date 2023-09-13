import jwt from 'jsonwebtoken'

const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_secret,{
        expiresIn: '30d'
    })

    //set jwt as httpOnly Cookie
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        sameSite: 'strict'
    })
}

export default generateToken;