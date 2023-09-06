import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import CategoryRoutes from './Routes/CategoryRoutes.js';
import ArticleRoutes from './Routes/ArticleRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

//use Json
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use('/api/categories', CategoryRoutes);

app.use('/api/articles', ArticleRoutes);

app.use('/api/users/login', UserRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

