import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import expectJsonMiddleware from './middleware/expectJson.js'; 
import userRoutes from './routes/userRoutes.js'
dotenv.config();
const app = express();
connectDB();
app.use(express.json()); 
app.use(expectJsonMiddleware);
app.get('/', (req, res) => {
    res.status(200).json('Hello, MongoDB is connected!');
});
app.use('/api/users', userRoutes);

app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});
