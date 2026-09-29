import express from 'express';
import {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  googleAuth,
  resetPassword,
  getMe,
  updateProfile,
  addAddress,
  deleteAddress,
  toggleWishlist
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.post('/reset-password', resetPassword);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

router.post('/addresses', protect, addAddress);
router.delete('/addresses/:id', protect, deleteAddress);

router.post('/wishlist/toggle', protect, toggleWishlist);

export default router;
