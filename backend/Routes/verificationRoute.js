import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {vericationController} from '../controllers/verificationController.js'

const router = express.Router();

router.route('/').post(vericationController);

export default router;