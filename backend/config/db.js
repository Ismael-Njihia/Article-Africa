import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

let MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            // To avoid warnings in the console
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
        
    }
}
export default connectDB