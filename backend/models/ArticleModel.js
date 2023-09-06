import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // The author is a reference to the User model
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