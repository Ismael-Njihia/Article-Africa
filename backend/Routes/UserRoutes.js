import User from "../models/UserModel.js";
import express from "express";

import {registerUser, login, logoutUser, getAllUsers, getUserByEmailAddress, EditUserById} from '../controllers/userControllers.js'
import { admin, authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(authenticateToken, admin,getAllUsers);
router.route('/register').post(authenticateToken, admin, registerUser);
router.route('/login').post(login);
router.route('/logout').get(logoutUser);
router.route('/email').post(authenticateToken, admin, getUserByEmailAddress);
router.route('/:id').put(authenticateToken, admin,EditUserById);


export default router;