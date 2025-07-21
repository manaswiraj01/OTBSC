import express from 'express';
import { connectDB } from './config/database.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


app.use('/api', authRouter);
app.use('/api', profileRouter);


connectDB()
    .then(() => {
        console.log("Connected to database successfully");
        app.listen(4000, () => {
            console.log('Server is listing on port 4000');
        });
    })
    .catch((err) => {
        console.error("Error into connection to database", err);
    });

