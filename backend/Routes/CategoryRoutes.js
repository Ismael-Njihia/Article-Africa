import Category from "../models/CategoryModel.js";
import express from "express";

const router = express.Router();

router.get('/',async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
});

router.post('/', async (req, res) => {
    try {
        const {name} = req.body
        //check if already exists
        const categoryExists = await Category.findOne({name})
        if(categoryExists){
            res.status(400).json({message: 'Category already exists'})
            throw new Error('Category already exists')
        }
        const category = new Category({name})
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
})


export default router;