
import express from "express";
import {createArticle,
    deleteArticleById,
    editArticleById,
    getArticles,
    getManyArticlesById,
    getArticlesById} from '../controllers/ArticleController.js'
import {admin, authenticateToken} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getArticles);
router.route('/:id').get(getArticlesById)
router.route('/many').post(getManyArticlesById)
router.route('/:id').delete(authenticateToken, admin, deleteArticleById)
router.route('/:id').put(authenticateToken, editArticleById)
router.route('/').post(authenticateToken, createArticle)

export default router;
