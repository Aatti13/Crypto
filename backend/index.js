import express from 'express';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;

// Pre-defined Middlewares
app.use(express.json());
app.use(passport.initialize());

// Custom Middlewares
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
  console.log(`Listening At: ${PORT}`)
});
