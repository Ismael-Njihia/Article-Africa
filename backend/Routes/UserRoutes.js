import express from "express";

import {registerUser, login, logoutUser, getAllUsers, getUserByEmailAddress, EditUserById, getUserByUsername} from '../controllers/userControllers.js'
import { admin, authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(authenticateToken,getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(login);
router.route('/logout').post(logoutUser);
router.route('/email').post(authenticateToken, admin, getUserByEmailAddress);
router.route('/:username').get(getUserByUsername);
router.route('/:id').put(authenticateToken, admin,EditUserById);


export default router;