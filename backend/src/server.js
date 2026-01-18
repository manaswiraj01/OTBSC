import express from 'express';
import { connectDB } from './config/database.js';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import adminRouter from './routes/admin.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import adminProfileRouter from './routes/adminProfile.js';
import placeRouter from './routes/place.js';
import adminAccessRouter from './routes/adminAccess.js';
import locationRouter from './routes/locationRoutes.js';
import reviewRouter from './routes/reviewRoute.js';

const app = express();
dotenv.config();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', placeRouter);
app.use('/', locationRouter);
app.use('/', reviewRouter);
app.use('/admin', adminRouter);
app.use('/admin', adminProfileRouter);
app.use('/admin', placeRouter);
app.use('/admin', adminAccessRouter);

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

