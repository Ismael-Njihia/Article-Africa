import Article from "../models/ArticleModel.js";
import Category from "../models/CategoryModel.js";
import express from "express";
import {  authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/',authenticateToken, async (req, res) => {
    try {
        const { title, category, body } = req.body;
        //The title must be unique
        const titleLowercase = title.toLowerCase();

        const existingArticle = await Article.findOne({ titleLowercase });
        if (existingArticle) {
            return res.status(400).json({ message:'Your article title needs to be unique, Change it and try again'});
        }
        // Get the category ObjectId by finding the category based on its name
        const categoryExists = await Category.findOne({ name: category });

        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const article = new Article({ title, category: categoryExists._id, body, titleLowercase });
        await article.save();
        res.status(201).json(article);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
