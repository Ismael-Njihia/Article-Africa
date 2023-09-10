import Article from "../models/ArticleModel.js";
import Category from "../models/CategoryModel.js";
import express from "express";
import {createArticle,
    deleteArticleById,
    editArticleById,
    getArticles,
    getArticlesById} from '../controllers/ArticleController.js'

const router = express.Router();

router.route('/').get(getArticles);
router.route('/:id').get(getArticlesById)
router.route('/:id').delete(deleteArticleById)
router.route('/:id').put(editArticleById)
router.route('/').post(createArticle)

export default router;
