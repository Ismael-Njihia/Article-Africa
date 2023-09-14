import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            throw new Error('Not Authorized, no token');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_secret);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Not Authorized, token failed' });
    }
};


//Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.userType === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
}

export {authenticateToken, admin}
