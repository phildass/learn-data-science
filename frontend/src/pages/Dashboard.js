import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ user, setUser }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const response = await axios.get('/modules');
      if (response.data.success) {
        setModules(response.data.modules);
      }
    } catch (error) {
      console.error('Failed to load modules', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const allModulesCompleted = user.progress.completedModules.length === 6;

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading modules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="logo-bar">
        <h1 style={{ margin: 0 }}>🎓 AI Cloud Enterprises - Data Science Learning Platform</h1>
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#718096' }}>
          Powered by iiskills.cloud
        </div>
      </div>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Welcome, {user.phoneNumber}</h2>
            <p>Complete all 6 modules and take the quiz to earn your certificate!</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Your Progress</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(user.progress.completedModules.length / 6) * 100}%` }}
          ></div>
        </div>
        <p style={{ marginTop: '10px' }}>
          <strong>{user.progress.completedModules.length} of 6 modules completed</strong>
        </p>
        
        {user.progress.certificateEarned && (
          <div style={{ marginTop: '20px' }}>
            <span className={`badge badge-${user.progress.passLevel}`}>
              {user.progress.passLevel?.toUpperCase()} Certificate Earned! 🎉
            </span>
            <button 
              onClick={() => navigate('/certificate')} 
              className="btn btn-success"
              style={{ marginLeft: '10px' }}
            >
              View Certificate
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Course Modules</h2>
        <div className="module-grid">
          {modules.map((module) => {
            const isCompleted = user.progress.completedModules.includes(module.id);
            return (
              <div
                key={module.id}
                className={`module-card ${isCompleted ? 'completed' : ''}`}
                onClick={() => navigate(`/module/${module.id}`)}
              >
                <h3>
                  {isCompleted && '✓ '}
                  Module {module.id}: {module.title}
                </h3>
                <p style={{ color: '#718096', margin: '10px 0' }}>
                  {module.description}
                </p>
                <p style={{ fontSize: '14px', color: '#a0aec0' }}>
                  ⏱ {module.duration}
                </p>
                {isCompleted && (
                  <span className="badge badge-success">Completed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2>Ready for the Quiz?</h2>
        <p>Complete all modules to unlock the certification quiz.</p>
        <button
          onClick={() => navigate('/quiz')}
          className="btn btn-primary"
          disabled={!allModulesCompleted}
          style={{ opacity: allModulesCompleted ? 1 : 0.5 }}
        >
          {allModulesCompleted ? 'Take Quiz Now' : 'Complete All Modules First'}
        </button>
        
        {user.progress.quizScore !== null && (
          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <strong>Last Quiz Score: {user.progress.quizScore}%</strong>
            <p>You can retake the quiz to improve your score!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
