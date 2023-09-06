import mongoose from 'mongoose'
import User from './UserModel'

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

const Article = mongoose.model('Article', articleSchema)
export default Article