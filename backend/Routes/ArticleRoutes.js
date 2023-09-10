import Article from "../models/ArticleModel.js";
import Category from "../models/CategoryModel.js";
import express from "express";
import {createArticle,
    deleteArticleById,
    editArticleById,
    getArticles,
    getArticlesById} from '../controllers/ArticleController.js'
import {admin, authenticateToken} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getArticles);
router.route('/:id').get(getArticlesById)
router.route('/:id').delete(authenticateToken, admin, deleteArticleById)
router.route('/:id').put(authenticateToken, editArticleById)
router.route('/').post(authenticateToken, createArticle)

export default router;
