
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import CategoryRoutes from './Routes/CategoryRoutes.js';
import ArticleRoutes from './Routes/ArticleRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';
import verificationRoute from './Routes/verificationRoute.js';
import sendEmail from './Routes/massEmailerRoutes.js';
import { notFound, errorHandler } from './middleware/errormiddleware.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

//use Json
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))


app.use('/api/categories', CategoryRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/api/articles', ArticleRoutes);

app.use('/api/users', UserRoutes);
app.use('/api/verification', verificationRoute);
app.use('/api/sendemail', sendEmail);


const __dirname = path.resolve();
app.use(
    express.static(path.join(__dirname, '/frontend/build'))
)
app.get('*', (req, res) =>
res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
)




app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

