import mongoose from 'mongoose'
import User from './UserModel.js'
import Category from './CategoryModel.js'

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    titleLowercase: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    body: {
        type: String,
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    }
}, {timestamps: true})

//Define a post 'save' hook to update the articles array in the corresponding category
articleSchema.post('save', async function(){
    try {
        await Category.findByIdAndUpdate(this.category, {$addToSet: {articles: this._id}})

        
    } catch (error) {
        console.log(error)
        
    }
})

const Article = mongoose.model('Article', articleSchema)
export default Article