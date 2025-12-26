const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load modules data
const modulesPath = path.join(__dirname, '../data/modules.json');
const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf8'));

// Get all modules
router.get('/', (req, res) => {
  // Return modules without full content (just titles and descriptions)
  const moduleSummaries = modules.map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    duration: m.duration
  }));
  
  res.json({ success: true, modules: moduleSummaries });
});

// Get specific module content
router.get('/:id', (req, res) => {
  const moduleId = parseInt(req.params.id);
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) {
    return res.status(404).json({ success: false, message: 'Module not found' });
  }
  
  res.json({ success: true, module });
});

// Mark module as completed
router.post('/:id/complete', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  
  const moduleId = parseInt(req.params.id);
  const authModule = require('./auth');
  const user = authModule.users.get(req.session.userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  if (!user.progress.completedModules.includes(moduleId)) {
    user.progress.completedModules.push(moduleId);
    authModule.users.set(req.session.userId, user);
  }
  
  res.json({ 
    success: true, 
    message: 'Module marked as completed',
    completedModules: user.progress.completedModules
  });
});

module.exports = router;
