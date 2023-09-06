import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Category from "../models/CategoryModel.js";

const categoriesToSeed = [
    {
        name: 'Technology'
    },
    {
        name: 'Lifestyle'
    },
    {
        name: 'Business'
    },
    {
        name: 'Sports'
    },
    {
        name: 'Entertainment'
    },
    {
        name: 'Science'
    },
    {
        name: 'Health'
    },{
        name: 'Politics'
    },{
        name: 'Travel'
    }
]

const seedCategories = async () =>{
    try {
        await connectDB()
        await Category.insertMany(categoriesToSeed)
        console.log('Categories seeded successfully')
        process.exit()
        
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
        
    }finally{
        mongoose.connection.close()
    }
}

seedCategories()