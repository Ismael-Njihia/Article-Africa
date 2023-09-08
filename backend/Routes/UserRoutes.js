import User from "../models/UserModel.js";
import express from "express";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body
        //check if already exists
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: 'Wrong Credentials!' }); 
        }
        
        //match password
        if (user.password == password){
            const token = jwt.sign({ id: user._id }, process.env.JWT_secret, 
                   { expiresIn: '30d' });
            //set JWT as HTTP-only cookie
            res.cookie('jwttoken', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
            })

            res.status(200).json({ message: 'Login Success', user});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
        
    }
})

export default router;