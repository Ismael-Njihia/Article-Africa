import User from "../models/UserModel.js";
import express from "express";
import jwt from 'jsonwebtoken';
import {registerUser, login, logoutUser, getAllUsers, getUserByEmailAddress, EditUserById} from '../controllers/userControllers.js'

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').get(logoutUser);
router.route('/email').post(getUserByEmailAddress);
router.route('/:id').put(EditUserById);


export default router;