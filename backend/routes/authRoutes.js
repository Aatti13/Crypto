import { User } from "../models/User.js";
import { Router } from "express";
import { register, login, resetPassword, setup2FA, verify2FA } from "../controllers/authController.js";

const router = Router();

// CRUD Operations

// 1. Register
router.post('/register', register);

// 2. Login
router.post('/login', login);

// 3. Update
router.put('/reset-password', resetPassword);

/* 4. 2FA (Two-Factor Authentication) 
    a. Setup 2FA
    b. Verify 2FA
*/
router.post('/setup-2fa', setup2FA);
router.post('/verify-2fa', verify2FA);

// 5. 

export default router;