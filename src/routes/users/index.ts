import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/environment';
import mongoose from 'mongoose';

const User = mongoose.model('users');
const router = express.Router();

router.post('/login', async (req, res): Promise<void> => {
 try {
  const { email } = req.body;

  if (!email) {
   res.status(400).json({ message: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   res.status(400).json({ message: 'Please provide a valid email' });
  }

  let user = await User.findOne({ email });

  if (!user) {
   user = await User.create({ email });
  }

  const token = jwt.sign(
   {
    id: user.email,
    email: user.email,
   },
   config.JWT_SECRET,
   { expiresIn: '24h' }
  );

  res.json({
   token,
   user: {
    id: user._id,
    email: user.email,
   },
  });
 } catch (error) {
  console.error('Login error:', error);
  res.status(500).json({ message: 'Server error' });
 }
});

export default router;
