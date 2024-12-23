import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notfound, errorHandler } from './middleware/errorMiddelware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://user-management-by5v.vercel.app', // Add your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
  credentials: true, // Include credentials if needed
}));

// Routes
app.get('/', (req, res) => res.send('server is ready'));
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(notfound);
app.use(errorHandler);

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));
