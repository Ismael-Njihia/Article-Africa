import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const authenticateToken = async (req, res, next) => {
    let token;

    //read the Jwttoken from the cookie
   token = req.cookies.jwt
   if(token){
    try {
        const decoded = jwt.verify(token, process.env.JWT_secret)
        req.user = await User.findById(decoded.id).select('-password');
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized, token failed')
    }

   }else{
    res.status(401)
    throw new Error('Not Authorized, no token')
   }
}

//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
}

export {authenticateToken, admin}
