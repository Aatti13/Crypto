import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;
dotenv.config();

// Pre-defined Middlewares
app.use(express.json());
app.use(passport.initialize());

const connectDB = ()=>{
  mongoose
  .connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('Connected to DB')
  })
  .catch((error)=>{
    throw error;
  });
}

// Custom Middlewares
app.use('/api/auth', authRoutes);
// app.use('/api/tutorials');
// app.use('/api/quizzes');

app.listen(PORT, ()=>{
  connectDB();
  console.log(`Listening At: ${PORT}`)
});
