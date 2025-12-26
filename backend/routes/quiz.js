const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load quiz data
const quizPath = path.join(__dirname, '../data/quiz.json');
const quizQuestions = JSON.parse(fs.readFileSync(quizPath, 'utf8'));

// Get quiz questions (without correct answers)
router.get('/questions', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  // Remove correct answers from response
  const questions = quizQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));
  
  res.json({ success: true, questions });
});

// Submit quiz answers
router.post('/submit', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const { answers } = req.body; // Array of {questionId, selectedAnswer}
  
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ success: false, message: 'Invalid answers format' });
  }
  
  const authModule = require('./auth');
  const user = authModule.users.get(req.session.userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  // Calculate score
  let correctCount = 0;
  const results = answers.map(answer => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    if (!question) return null;
    
    const isCorrect = question.correctAnswer === answer.selectedAnswer;
    if (isCorrect) correctCount++;
    
    return {
      questionId: answer.questionId,
      question: question.question,
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
      explanation: question.explanation
    };
  }).filter(r => r !== null);
  
  const totalQuestions = quizQuestions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  // Determine pass level
  let passLevel = null;
  let certificateEarned = false;
  
  if (percentage >= 90) {
    passLevel = 'gold';
    certificateEarned = true;
  } else if (percentage >= 70) {
    passLevel = 'silver';
    certificateEarned = true;
  } else if (percentage >= 50) {
    passLevel = 'bronze';
    certificateEarned = true;
  }
  
  // Save quiz attempt
  const attempt = {
    timestamp: new Date().toISOString(),
    score: correctCount,
    totalQuestions: totalQuestions,
    percentage: percentage,
    passLevel: passLevel,
    answers: answers
  };
  
  user.progress.quizAttempts.push(attempt);
  user.progress.quizScore = percentage;
  user.progress.certificateEarned = certificateEarned;
  user.progress.passLevel = passLevel;
  
  authModule.users.set(req.session.userId, user);
  
  res.json({ 
    success: true, 
    results: results,
    score: correctCount,
    totalQuestions: totalQuestions,
    percentage: percentage,
    passLevel: passLevel,
    certificateEarned: certificateEarned
  });
});

// Get certificate
router.get('/certificate', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const authModule = require('./auth');
  const user = authModule.users.get(req.session.userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  if (!user.progress.certificateEarned) {
    return res.status(400).json({ success: false, message: 'Certificate not earned yet' });
  }
  
  const certificate = {
    userName: user.phoneNumber,
    courseName: 'Data Science & AI/ML for Indian Job Market',
    completionDate: new Date().toISOString(),
    score: user.progress.quizScore,
    passLevel: user.progress.passLevel,
    certificateId: 'CERT-' + user.phoneNumber + '-' + Date.now()
  };
  
  res.json({ success: true, certificate });
});

module.exports = router;
