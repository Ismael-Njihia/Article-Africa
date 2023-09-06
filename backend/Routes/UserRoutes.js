import User from "../models/UserModel.js";
import express from "express";
import jwt from 'jsonwebtoken'

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
            res.status(200).json({ message: 'Login Success', user });

            //create token
            const token = jwt.sign({id: user._id}, process.env.JWT_secret, {expiresIn: '30d'})
            res.cookie('token', token, {httpOnly: true})

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
        
    }
})

export default router;