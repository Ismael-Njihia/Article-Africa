import express from 'express';
import { sendEmail } from '../controllers/massEmailerController.js';
import { admin, authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(authenticateToken, admin, sendEmail);

export default router;