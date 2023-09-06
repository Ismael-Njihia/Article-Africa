import User from "../models/UserModel.js";
import connectDB from "../config/db.js";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

const usersToSeed = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 123456,
        isAdmin: true,
        userType: 'admin'

    },
    {
        name: 'John Doe',
        email: 'John@gmail.com',
        password: 123456,
        isAdmin: false
    }
]

const seedUsers = async () =>{
    try {
        await connectDB()
        await User.insertMany(usersToSeed)
        console.log('Users seeded successfully')
        process.exit()
        
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
        
    }finally{
        mongoose.connection.close()
    }
}
seedUsers()
