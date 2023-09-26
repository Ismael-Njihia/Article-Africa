import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import CategoryRoutes from './Routes/CategoryRoutes.js';
import ArticleRoutes from './Routes/ArticleRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';


import { notFound, errorHandler } from './middleware/errormiddleware.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//use Json
app.use(express.json());
app.use(cookieParser());
app.use('/api/upload', uploadRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
})


connectDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/categories', CategoryRoutes);

app.use('/api/articles', ArticleRoutes);

app.use('/api/users', UserRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

