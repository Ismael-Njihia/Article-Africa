import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/CategoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
})

const addCategory = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
  
      console.log('Category received:', name);
  
      // Check if category exists
      const categoryExists = await Category.findOne({ name });
  
      console.log('Category exists in database:', categoryExists);
  
      if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
      }
  
      // Save the category
      const newCategory = await Category.create({ name });
      res.json(newCategory);
    } catch (error) {
      // Handle errors here
      res.status(500).json({ error: error.message });
    }
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
const getCategoryByName = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.name })
        .populate('');
        if (category) {
            return res.json(category);
        } else {
            res.status(404);
            throw new Error('Category not found');
            console.log('Category not found')
        }
    } catch (error) {
        console.error(error); // Add this line to log the error
        res.status(500).json({ message: 'Server Error' });
    }
});



export  {getCategories, addCategory, getCategoryById, deleteCategoryById, getCategoryByName}