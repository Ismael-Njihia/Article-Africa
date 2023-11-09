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
    username:{
        type: String,
        required: true,
        unique: true

    },
    isAdmin: {
        type: Boolean, 
        required: true,
        default: false
    },
    bio:{
        type: String,
        required: false,
        default: 'A hardworking writer'
    },
    image:{
        type: String,
        required: false,
        default: '/uploads/image-1695634563122.png'
    },
    userType: {
        type: String,
        required: true,
        default: 'writer'
    },
    articles:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article'
        }
    ],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode: {
        type: String,
        required: true,
        default: '123456'
    },
     
}, {timestamps: true})

const User = mongoose.model('User', UserModel)
export default User

