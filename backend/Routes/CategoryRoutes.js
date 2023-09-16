
import express from "express";
import {getCategories, getCategoryById, addCategory, deleteCategoryById,getCategoryByName} from '../controllers/CategoriesController.js'
import {admin, authenticateToken} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getCategories);
router.route('/:name').get(getCategoryByName)
router.route('/:id').get(getCategoryById)
router.route('/:id').delete(authenticateToken, admin, deleteCategoryById)
router.route('/').post(addCategory)




export default router;