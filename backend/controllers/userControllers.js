import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    //check if email exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({name, email, password});

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            isAdmin: user.isAdmin,
            userType: user.userType,
            
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //check if email exists
    const user = await User.findOne({email});
    if (user && password == user.password){
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
    else{
        res.status(400);
        throw new Error('Invalid email or password');
    }
})

const logoutUser = asyncHandler(async (req, res) => {
   res.cookie('token', null, {
       expires: new Date(Date.now()),
       httpOnly: true
   })
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

const getUserByEmailAddress = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.params.email});

    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})

const EditUserById = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin, userType } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = name;
        user.email = email;
        user.password = password;
        user.isAdmin = isAdmin;
        user.userType = userType;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
})

export {registerUser, login, logoutUser, getAllUsers, getUserByEmailAddress, EditUserById}