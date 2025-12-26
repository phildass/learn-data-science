const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Admin credentials (in production, use database with hashed passwords)
const adminCredentials = {
  password: 'phil123' // Change this after first login
};

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.status(401).json({ success: false, message: 'Admin authentication required' });
  }
  next();
};

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === adminCredentials.password) {
    req.session.isAdmin = true;
    res.json({ success: true, message: 'Admin login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Change admin password
router.post('/change-password', requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (currentPassword !== adminCredentials.password) {
    return res.status(400).json({ success: false, message: 'Current password is incorrect' });
  }
  
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
  }
  
  adminCredentials.password = newPassword;
  
  res.json({ success: true, message: 'Password changed successfully' });
});

// Admin logout
router.post('/logout', requireAdmin, (req, res) => {
  req.session.isAdmin = false;
  res.json({ success: true, message: 'Admin logged out' });
});

// Get all users
router.get('/users', requireAdmin, (req, res) => {
  const authModule = require('./auth');
  const usersArray = Array.from(authModule.users.values());
  
  res.json({ success: true, users: usersArray });
});

// Search/filter users
router.get('/users/search', requireAdmin, (req, res) => {
  const { query, filter } = req.query;
  const authModule = require('./auth');
  let usersArray = Array.from(authModule.users.values());
  
  // Apply search query
  if (query) {
    usersArray = usersArray.filter(user => 
      user.phoneNumber.includes(query)
    );
  }
  
  // Apply filters
  if (filter === 'certified') {
    usersArray = usersArray.filter(user => user.progress.certificateEarned);
  } else if (filter === 'not-certified') {
    usersArray = usersArray.filter(user => !user.progress.certificateEarned);
  } else if (filter === 'paid') {
    usersArray = usersArray.filter(user => user.paymentStatus === 'completed');
  } else if (filter === 'pending-payment') {
    usersArray = usersArray.filter(user => user.paymentStatus === 'pending');
  }
  
  res.json({ success: true, users: usersArray });
});

// Get specific user details
router.get('/users/:phoneNumber', requireAdmin, (req, res) => {
  const { phoneNumber } = req.params;
  const authModule = require('./auth');
  const user = authModule.users.get(phoneNumber);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ success: true, user });
});

// Export users as CSV
router.get('/export/users', requireAdmin, (req, res) => {
  const authModule = require('./auth');
  const usersArray = Array.from(authModule.users.values());
  
  // Create CSV header
  let csv = 'Phone Number,Created At,Payment Status,Completed Modules,Quiz Score,Pass Level,Certificate Earned,Quiz Attempts\n';
  
  // Add user rows
  usersArray.forEach(user => {
    csv += `${user.phoneNumber},`;
    csv += `${user.createdAt},`;
    csv += `${user.paymentStatus},`;
    csv += `${user.progress.completedModules.length},`;
    csv += `${user.progress.quizScore || 'N/A'},`;
    csv += `${user.progress.passLevel || 'N/A'},`;
    csv += `${user.progress.certificateEarned ? 'Yes' : 'No'},`;
    csv += `${user.progress.quizAttempts.length}\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
  res.send(csv);
});

// Get all modules (for admin view)
router.get('/modules', requireAdmin, (req, res) => {
  const modulesPath = path.join(__dirname, '../data/modules.json');
  const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));
  
  res.json({ success: true, modules });
});

// Get quiz questions (for admin view)
router.get('/quiz', requireAdmin, (req, res) => {
  const quizPath = path.join(__dirname, '../data/quiz.json');
  const quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
  
  res.json({ success: true, quiz });
});

// Get quiz attempts for a user
router.get('/users/:phoneNumber/quiz-history', requireAdmin, (req, res) => {
  const { phoneNumber } = req.params;
  const authModule = require('./auth');
  const user = authModule.users.get(phoneNumber);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.json({ success: true, quizAttempts: user.progress.quizAttempts });
});

// Get dashboard stats
router.get('/stats', requireAdmin, (req, res) => {
  const authModule = require('./auth');
  const usersArray = Array.from(authModule.users.values());
  
  const stats = {
    totalUsers: usersArray.length,
    paidUsers: usersArray.filter(u => u.paymentStatus === 'completed').length,
    certifiedUsers: usersArray.filter(u => u.progress.certificateEarned).length,
    goldCertificates: usersArray.filter(u => u.progress.passLevel === 'gold').length,
    silverCertificates: usersArray.filter(u => u.progress.passLevel === 'silver').length,
    bronzeCertificates: usersArray.filter(u => u.progress.passLevel === 'bronze').length,
    totalQuizAttempts: usersArray.reduce((sum, u) => sum + u.progress.quizAttempts.length, 0)
  };
  
  res.json({ success: true, stats });
});

module.exports = router;
