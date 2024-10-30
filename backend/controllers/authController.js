// IMPORTS
import mongoose from "mongoose";
import { PREDEFINED_SECURITY_QUESTIONS } from "../constants/securityQuestions.js";
import { User } from "../models/User.js";
import crypto from 'crypto';
import * as argon2 from 'argon2';
import { authenticator } from "otplib";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
// import rateLimit from 'express-rate-limiter';

// ------------------------------------------------------------------------------

config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ------------------------------------------------------------------------------

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

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
export const register = async (req, res)=>{
  try{
    const {
      email,
      password,
      firstname,
      lastname,
      securityQuestions,
      phoneNumber
    } = req.body;

    const registeredUser = await User.findOne({ email });
    if(registeredUser){
      return res.status(400).json({message: 'User Already exists.'});
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });

    const hashedSecurityQuestions = securityQuestions.map((q) => ({
      question: q.question,
      answer: crypto
        .createHash('sha256')
        .update(q.answer.toLowerCase())
        .digest('hex'),
    }));

    const user = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      securityQuestions: hashedSecurityQuestions,
      profile: {
        phoneNumber,
      },
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Successfully Registered',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });

  }catch(error){
    res.status(501).json({message: error.message});
  }
}

// ------------------------------------------------------------
// Login --> (To login to your crypto account)
export const login = async (req, res)=>{
  try{

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message: 'Not Found/Invalid Credentials'});
    }

    if(user.isLocked){
      res.status(403).json({
        message: 'Account Locked due to too many attempts'
      });
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if(!isValidPassword){
      user.loginAttempts += 1;

      if(user.loginAttempts >= 5){
        user.isLocked = true;
      }

      await user.save();

      return res.status(401).json ({
        message: 'Invalid Credentials',
        attemptsRemaining: 5-user.loginAttempts
      });
    }

    user.loginAttempts = 0;
    user.lastLogin = new Date();
    await user.save();

    if(user.isTwoFactorEnabled){
      return res.status(200).json({
        requiresTwoFactor: true,
        userId: user._id,
      });
    }

    const token = generateToken(user._id);
    res.status(201).json({
      message:  'Login Successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });

  }catch(error){
    res.status(501).json({message: error.message});
  }
}

// ------------------------------------------------------------
// rese
export const resetPasswordRequest = async (req, res)=>{
  try{
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        message: 'User Not Found/Invalid Credentials'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) has requested the reset of your password. Please click on the following link, or paste this into your browser to complete the process: \n\nhttp://${req.headers.host}/reset-password/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset instructions sent to email' });
  }catch(error){
    res.status(501).status({
      message: 'Password reset failed',
      error: error.message
    });
  }
}

export const resetPassword = async (req, res)=>{
  try{
    const {token, newPassword} = req.body;

    const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user){
      return res.status(404).json({
        message: 'Invalid Credentials/Not Found'
      })
    }

    const hashedPassword = argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 2**16,
      timeCost: 3,
    });

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({message: 'Password Reset Successful.'});
  }catch(error){
    return req.status(501).json({
      error: error.message,
      message: 'Password Reset Failed'
    });
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

// Security Questions
export const securityQuestions = (req, res)=>{
  try{
    res.status(201).json({questions: PREDEFINED_SECURITY_QUESTIONS});
  }catch(error){
    res.status(502).json({message: error.message});
  }
}


export const googleLogin = async (req, res)=>{
  try{

    const {token} = req.body;

  }catch(error){
    return res.status(501).json({
      error: error.message,
      message: 'Verification Failed'
    });
  }
}