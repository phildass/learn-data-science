import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ModuleView({ user }) {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadModule();
  }, [id]);

  const loadModule = async () => {
    try {
      const response = await axios.get(`/modules/${id}`);
      if (response.data.success) {
        setModule(response.data.module);
      }
    } catch (error) {
      console.error('Failed to load module', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await axios.post(`/modules/${id}/complete`);
      alert('Module completed! Great job!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to mark module as complete', error);
      alert('Failed to mark module as complete. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading module...</div>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container">
        <div className="card">
          <h2>Module not found</h2>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = user.progress.completedModules.includes(parseInt(id));

  return (
    <div className="container">
      <div className="card">
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Module {module.id}: {module.title}</h2>
            <p style={{ color: '#718096' }}>{module.description}</p>
            <p style={{ fontSize: '14px', color: '#a0aec0' }}>⏱ Estimated time: {module.duration}</p>
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
          {module.content}
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
    </div>
  );
}

export default ModuleView;
