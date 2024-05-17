import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./database/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

// connect to database
connectDB();

// middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());

// routes
app.use(authRoutes);

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});