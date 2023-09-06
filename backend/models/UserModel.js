import mongoose from 'mongoose'

const UserModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean, 
        required: true,
        default: false
    },
    userType: {
        type: String,
        required: true,
        default: 'writer'
    }
     
}, {timestamps: true})

const User = mongoose.model('User', UserModel)
export default User
