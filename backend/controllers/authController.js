// IMPORTS
import mongoose from "mongoose";
// import rateLimit from 'express-rate-limiter';

// ------------------------------------------------------------
/* Auth Rate Limiter
- To Prevent excess login requests (to reduce server load)
- To Limit no. of logins: 5 per 15 mins. 
*/
// export const authLimiter = rateLimit({
//   windowMs: 15*60*1000,
//   max: 5,
//   message: {message: 'Too many login attempts. Please try again later.'}
// });

// ------------------------------------------------------------
// register --> (To register new user)
export const register = (req, res)=>{
  try{
    res.status(201).json({message: 'Successful Login'});
  }catch(error){
    res.status(501).json({message: error.message});
  }
}

// ------------------------------------------------------------
// Login --> (To login to your crypto account)
export const login = (req, res)=>{
  try{
    res.status(201).json({message: 'Login Successful'});
  }catch(error){
    res.status(501).json({message: error.message});
  }
}

// ------------------------------------------------------------
// rese
export const resetPassword = (req, res)=>{
  try{
    res.status(201).json({message: "Password Reset Successfully"});
  }catch(error){
    res.status(501).status({message: error.message});
  }
}

export const setup2FA = (req, res)=>{
  try{
    res.status(201).json({message: '2FA setup complete'});
  }catch(error){
    res.status(501).json({message: error.message});
  }
}

export const verify2FA = (req, res)=>{
  try{
    res.status(201).json({message: '2fa-Req.'});
  }catch(error){
    res.status(501).json({message: error.message});
  }
}

export const securityQuestions = (req, res)=>{
  try{

  }catch(error){
    res.status(502).json()
  }
}
