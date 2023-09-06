import mongoose from 'mongoose'

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
    //category comes from the Category model
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Article = mongoose.model('Article', articleSchema)
export default Article