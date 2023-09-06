import mongoose from 'mongoose'

let MONGO_URI = 'mongodb+srv://ishmaelnjihia:Njihia7507@cluster0.99olahm.mongodb.net/ArticleAfrica?retryWrites=true&w=majority'
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