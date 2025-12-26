import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Certificate({ user }) {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCertificate();
  }, []);

  const loadCertificate = async () => {
    try {
      const response = await axios.get('/quiz/certificate');
      if (response.data.success) {
        setCertificate(response.data.certificate);
      }
    } catch (error) {
      console.error('Failed to load certificate', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading certificate...</div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="container">
        <div className="card">
          <h2>Certificate Not Available</h2>
          <p>You need to complete the quiz and earn at least 50% to get a certificate.</p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
          ← Back to Dashboard
        </button>
        <button onClick={handlePrint} className="btn btn-primary" style={{ marginBottom: '20px', marginLeft: '10px' }}>
          🖨️ Print Certificate
        </button>
      </div>

      <div className="certificate">
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#667eea', fontSize: '3rem', margin: '0' }}>🎓</h1>
        </div>
        
        <h2 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '10px' }}>
          Certificate of Completion
        </h2>
        
        <div style={{ height: '3px', background: '#ffd700', width: '200px', margin: '20px auto' }}></div>
        
        <p style={{ fontSize: '1.2rem', color: '#4a5568', marginTop: '30px' }}>
          This is to certify that
        </p>
        
        <h2 style={{ fontSize: '2.5rem', color: '#2d3748', margin: '20px 0', fontStyle: 'italic' }}>
          {certificate.userName}
        </h2>
        
        <p style={{ fontSize: '1.2rem', color: '#4a5568', marginTop: '30px' }}>
          has successfully completed
        </p>
        
        <h3 style={{ fontSize: '1.8rem', color: '#667eea', margin: '20px 0' }}>
          {certificate.courseName}
        </h3>
        
        <p style={{ fontSize: '1.1rem', color: '#4a5568', marginTop: '30px' }}>
          with a score of <strong style={{ color: '#667eea' }}>{certificate.score}%</strong>
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <span className={`badge badge-${certificate.passLevel}`} style={{ fontSize: '1.5rem', padding: '10px 30px' }}>
            {certificate.passLevel?.toUpperCase()} LEVEL
          </span>
        </div>
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
          <div>
            <div style={{ borderTop: '2px solid #2d3748', width: '200px', marginBottom: '10px' }}></div>
            <p style={{ fontSize: '0.9rem', color: '#718096' }}>Date of Completion</p>
            <p style={{ fontSize: '1rem', color: '#2d3748', fontWeight: '600' }}>
              {new Date(certificate.completionDate).toLocaleDateString('en-IN')}
            </p>
          </div>
          
          <div>
            <div style={{ borderTop: '2px solid #2d3748', width: '200px', marginBottom: '10px' }}></div>
            <p style={{ fontSize: '0.9rem', color: '#718096' }}>Authorized Signature</p>
            <p style={{ fontSize: '1.2rem', color: '#2d3748', fontWeight: '600', fontStyle: 'italic' }}>
              Learn Data Science
            </p>
          </div>
        </div>
        
        <div className="certificate-id">
          Certificate ID: {certificate.certificateId}
        </div>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#edf2f7', borderRadius: '10px' }}>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Achievement Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'left' }}>
            <div>
              <p style={{ color: '#718096' }}>Modules Completed:</p>
              <p style={{ color: '#2d3748', fontWeight: '600' }}>6 of 6</p>
            </div>
            <div>
              <p style={{ color: '#718096' }}>Final Score:</p>
              <p style={{ color: '#2d3748', fontWeight: '600' }}>{certificate.score}%</p>
            </div>
            <div>
              <p style={{ color: '#718096' }}>Performance Level:</p>
              <p style={{ color: '#2d3748', fontWeight: '600' }}>
                {certificate.passLevel === 'gold' && '🥇 Gold (90%+)'}
                {certificate.passLevel === 'silver' && '🥈 Silver (70-89%)'}
                {certificate.passLevel === 'bronze' && '🥉 Bronze (50-69%)'}
              </p>
            </div>
            <div>
              <p style={{ color: '#718096' }}>Skills Acquired:</p>
              <p style={{ color: '#2d3748', fontWeight: '600' }}>Python, ML, AI, Stats</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', marginTop: '30px' }}>
        <h3>What's Next?</h3>
        <p>Share your achievement and start applying for Data Science jobs!</p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/quiz')} className="btn btn-primary">
            Retake Quiz to Improve Score
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
