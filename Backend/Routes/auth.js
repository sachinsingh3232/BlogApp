import express from 'express'
import { LogOut, Login, Register } from '../Controllers/authController.js';

const router = express.Router();
router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', LogOut)
export default router;