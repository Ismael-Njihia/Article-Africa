import asyncHandler from "../middleware/asyncHandler.js";
import Article from "../models/ArticleModel.js";
import Category from "../models/CategoryModel.js";

const getArticles  = asyncHandler(async (req, res)=>{
    const articles = await Article.find({})
    .populate('category')
    //only name and id of the user
    .populate('postedBy', 'name id')
    res.json(articles);
})

const getArticlesById  = asyncHandler(async (req, res)=>{
    const article = await Article.findById(req.params.id)
    .populate('category')
    .populate('postedBy', 'name id')
    if (article) {
        return   res.json(article);
    } else {
        res.status(404)
        throw new Error('Article not found')
    }
})

const getManyArticlesById = asyncHandler(async (req, res) => {
    try {
        const articles = await Article.find({ _id: { $in: req.body.ids } })
            .populate('category')
            .populate('postedBy', 'name id');
        
        if (articles && articles.length > 0) {
            return res.json(articles);
        } else {
            res.status(404);
            throw new Error('Articles not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const editArticleById = asyncHandler(async(req, res)=>{
    const { title, category, body } = req.body;
    const article = await Article.findById(req.params.id);
    if (article) {
        article.title = title;
        article.category = category;
        article.body = body;
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } else {
        res.status(404)
        throw new Error('Article not Found')
    }
})

const deleteArticleById = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article) {
        await Article.deleteOne({ _id: req.params.id }); // Use deleteOne to delete the article
        res.json({ message: 'Article removed' });
    } else {
        res.status(404);
        throw new Error("Article not found");
    }
});


const createArticle = asyncHandler(async(req, res)=>{
    try {
        
        const { title, category, body,} = req.body;
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

        const article = new Article({ title, category: categoryExists._id, body, titleLowercase, postedBy: req.user._id });
        await article.save();
        res.status(201).json(article);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

})

export {
    createArticle,
    deleteArticleById,
    editArticleById,
    getArticles,
    getArticlesById,
    getManyArticlesById
}