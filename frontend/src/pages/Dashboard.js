import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import LogoBar from '../components/LogoBar';
import Footer from '../components/Footer';

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      loadModules();
      loadUserProgress();
    }
  }, [user]);

  const loadModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      // If no modules in database, use default module data
      if (!data || data.length === 0) {
        setModules(getDefaultModules());
      } else {
        setModules(data);
      }
    } catch (error) {
      console.error('Failed to load modules:', error);
      // Fallback to default modules
      setModules(getDefaultModules());
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      
      if (data) {
        setUserProgress(data);
      } else {
        // Create initial progress record
        const { data: newProgress, error: insertError } = await supabase
          .from('user_progress')
          .insert([{
            user_id: user.id,
            completed_modules: [],
            quiz_attempts: [],
            certificate_earned: false,
            payment_status: 'pending'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        setUserProgress(newProgress);
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
      // Use default progress
      setUserProgress({
        completed_modules: [],
        quiz_score: null,
        quiz_attempts: [],
        certificate_earned: false,
        pass_level: null,
        payment_status: 'pending'
      });
    }
  };

  const getDefaultModules = () => [
    { id: 1, title: 'Introduction to Data Science', description: 'Learn the fundamentals', order_index: 1, duration: '2 hours' },
    { id: 2, title: 'Python for Data Science', description: 'Master Python basics', order_index: 2, duration: '3 hours' },
    { id: 3, title: 'Statistics & Probability', description: 'Statistical foundations', order_index: 3, duration: '2.5 hours' },
    { id: 4, title: 'Machine Learning', description: 'ML algorithms and concepts', order_index: 4, duration: '4 hours' },
    { id: 5, title: 'Deep Learning', description: 'Neural networks and AI', order_index: 5, duration: '3.5 hours' },
    { id: 6, title: 'Career Roadmap', description: 'Indian job market guide', order_index: 6, duration: '1.5 hours' }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading || !userProgress) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <div className="loading">Loading dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const completedModules = userProgress.completed_modules || [];
  const allModulesCompleted = completedModules.length === 6;

  return (
    <div className="container">
      <LogoBar />
      
      <h1>🎓 Data Science Learning Platform</h1>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2>Welcome, {user.email}</h2>
            <p>Complete all 6 modules and take the quiz to earn your certificate!</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/forum')} className="btn btn-primary">
              💬 Forum
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Your Progress</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(completedModules.length / 6) * 100}%` }}
          ></div>
        </div>
        <p style={{ marginTop: '10px' }}>
          <strong>{completedModules.length} of 6 modules completed</strong>
        </p>
        
        {userProgress.certificate_earned && (
          <div style={{ marginTop: '20px' }}>
            <span className={`badge badge-${userProgress.pass_level}`}>
              {userProgress.pass_level?.toUpperCase()} Certificate Earned! 🎉
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
            const isCompleted = completedModules.includes(module.id);
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
                {module.duration && (
                  <p style={{ fontSize: '14px', color: '#a0aec0' }}>
                    ⏱ {module.duration}
                  </p>
                )}
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
        
        {userProgress.quiz_score !== null && (
          <div className="alert alert-info" style={{ marginTop: '20px' }}>
            <strong>Last Quiz Score: {userProgress.quiz_score}%</strong>
            <p>You can retake the quiz to improve your score!</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Dashboard;
