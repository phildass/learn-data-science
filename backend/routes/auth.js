const express = require('express');
const router = express.Router();

// In-memory user storage (replace with database in production)
const users = new Map();
const otpStore = new Map(); // Store OTPs temporarily

// Stub: Send OTP endpoint
router.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res.status(400).json({ success: false, message: 'Invalid phone number' });
  }
  
  // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with expiry (5 minutes)
  otpStore.set(phoneNumber, {
    otp: otp,
    expiry: Date.now() + 5 * 60 * 1000
  });
  
  // In production, send OTP via SMS service (iiskills.cloud)
  console.log(`OTP for ${phoneNumber}: ${otp}`);
  
  res.json({ 
    success: true, 
    message: 'OTP sent successfully',
    // Only for development - remove in production
    devOtp: otp 
  });
});

// Verify OTP and login
router.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;
  
  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Phone number and OTP required' });
  }
  
  const storedOtpData = otpStore.get(phoneNumber);
  
  if (!storedOtpData) {
    return res.status(400).json({ success: false, message: 'OTP not found or expired' });
  }
  
  if (Date.now() > storedOtpData.expiry) {
    otpStore.delete(phoneNumber);
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }
  
  if (storedOtpData.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
  
  // OTP verified - create or get user
  let user = users.get(phoneNumber);
  if (!user) {
    user = {
      phoneNumber: phoneNumber,
      createdAt: new Date().toISOString(),
      progress: {
        completedModules: [],
        quizScore: null,
        quizAttempts: [],
        certificateEarned: false,
        passLevel: null // 'bronze', 'silver', 'gold'
      },
      paymentStatus: 'pending' // 'pending', 'completed'
    };
    users.set(phoneNumber, user);
  }
  
  // Clear OTP
  otpStore.delete(phoneNumber);
  
  // Set session
  req.session.userId = phoneNumber;
  req.session.isAdmin = false;
  
  res.json({ 
    success: true, 
    message: 'Login successful',
    user: {
      phoneNumber: user.phoneNumber,
      progress: user.progress,
      paymentStatus: user.paymentStatus
    }
  });
});

// Stub: Payment endpoint
router.post('/payment', (req, res) => {
  const { phoneNumber, amount, paymentMethod } = req.body;
  
  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number required' });
  }
  
  const user = users.get(phoneNumber);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  // In production, integrate with payment gateway (iiskills.cloud)
  // For now, automatically mark as completed
  user.paymentStatus = 'completed';
  users.set(phoneNumber, user);
  
  res.json({ 
    success: true, 
    message: 'Payment successful',
    paymentId: 'PAY_' + Date.now(),
    user: {
      phoneNumber: user.phoneNumber,
      paymentStatus: user.paymentStatus
    }
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const user = users.get(req.session.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ 
    success: true,
    user: {
      phoneNumber: user.phoneNumber,
      progress: user.progress,
      paymentStatus: user.paymentStatus
    }
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Export users for admin access
module.exports = router;
module.exports.users = users;
