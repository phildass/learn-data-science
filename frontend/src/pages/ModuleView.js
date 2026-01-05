import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_MODULES } from '../constants/modules';
import LogoBar from '../components/LogoBar';
import Footer from '../components/Footer';

function ModuleView() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadModule();
      loadUserProgress();
    }
  }, [id, user]);

  const loadModule = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error) throw error;
      setModule(data);
    } catch (error) {
      console.error('Failed to load module:', error);
      // Fallback to default module
      setModule(getDefaultModule(parseInt(id)));
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

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setUserProgress(data);
      } else {
        setUserProgress({ completed_modules: [] });
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
      setUserProgress({ completed_modules: [] });
    }
  };

  const getDefaultModule = (moduleId) => {
    return DEFAULT_MODULES.find(m => m.id === moduleId) || null;
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const completedModules = userProgress.completed_modules || [];
      const moduleId = parseInt(id);
      
      if (!completedModules.includes(moduleId)) {
        const updatedModules = [...completedModules, moduleId];
        
        const { error } = await supabase
          .from('user_progress')
          .upsert({
            user_id: user.id,
            completed_modules: updatedModules
          }, { onConflict: 'user_id' });

        if (error) throw error;
        
        setUserProgress({ ...userProgress, completed_modules: updatedModules });
        alert('Module completed! Great job!');
      }
    } catch (error) {
      console.error('Failed to mark module as complete:', error);
      alert('Failed to mark module as complete. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading || !userProgress) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <div className="loading">Loading module...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container">
        <LogoBar />
        <div className="card">
          <h2>Module not found</h2>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isCompleted = (userProgress.completed_modules || []).includes(parseInt(id));

  return (
    <div className="container">
      <LogoBar />
      
      <div className="card">
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2>Module {module.id}: {module.title}</h2>
            <p style={{ color: '#718096' }}>{module.description}</p>
            {module.duration && (
              <p style={{ fontSize: '14px', color: '#a0aec0' }}>⏱ Estimated time: {module.duration}</p>
            )}
          </div>
          {isCompleted && (
            <span className="badge badge-success" style={{ fontSize: '18px' }}>
              ✓ Completed
            </span>
          )}
        </div>
      </div>

      <div className="card">
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '16px' }}>
          {module.content || 'Module content coming soon...'}
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        {!isCompleted ? (
          <>
            <p style={{ marginBottom: '20px', fontSize: '18px' }}>
              Have you finished reading this module?
            </p>
            <button 
              onClick={handleComplete} 
              className="btn btn-success"
              disabled={completing}
              style={{ fontSize: '18px', padding: '15px 40px' }}
            >
              {completing ? 'Marking as Complete...' : 'Mark as Completed ✓'}
            </button>
          </>
        ) : (
          <>
            <div className="alert alert-success">
              <h3>✓ You've completed this module!</h3>
              <p>Great work! Continue with the next module.</p>
            </div>
            <button 
              onClick={() => {
                const nextModuleId = parseInt(id) + 1;
                if (nextModuleId <= 6) {
                  navigate(`/module/${nextModuleId}`);
                } else {
                  navigate('/dashboard');
                }
              }}
              className="btn btn-primary"
              style={{ fontSize: '18px', padding: '15px 40px' }}
            >
              {parseInt(id) < 6 ? 'Next Module →' : 'Back to Dashboard'}
            </button>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default ModuleView;
