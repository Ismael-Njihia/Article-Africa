import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/CategoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
})

const addCategory = asyncHandler(async (req, res) => {
    const {category}  = req.body;
    //check if category exists
    const categoryExists = await Category.findOne({category});
    if(categoryExists){
        res.status(400)
        throw new Error('Category already exists');
    }
   //save the category
    const newCategory = await Category.create({category});
    res.json(newCategory);
});

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        return res.json(category);
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
})

const deleteCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        await category.remove();
        res.json({ message: 'Category removed' });
    }
    else {
        res.status(404)
        throw new Error("Category Not found")
    }
})
export  {getCategories, addCategory, getCategoryById, deleteCategoryById}