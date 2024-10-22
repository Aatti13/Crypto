import express from 'express';
import passport from 'passport';

const app = express();
const PORT = 3000;

// Pre-defined Middlewares
app.use(express.json());
app.use(passport.initialize());

// Custom Middlewares
// app.use('/api/auth');

app.listen(PORT, ()=>{
  console.log(`Listening At: ${PORT}`)
});
