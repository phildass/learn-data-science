import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogoBar from '../components/LogoBar';
import Footer from '../components/Footer';

function Login() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password, { role: 'user' });
        setMessage('Account created! Please check your email to verify your account, then login.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <LogoBar />
      
      <h1>🎓 iiskills.cloud - Data Science</h1>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
        Indian Institute of Professional Skills Development
      </h2>
      <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '30px', fontWeight: 'normal' }}>
        Master AI/ML for the Indian Job Market
      </h3>
      
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#667eea', marginBottom: '30px' }}>
          {mode === 'login' ? 'Login to Your Account' : 'Create Your Account'}
        </h2>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              required
              disabled={loading}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength="6"
              disabled={loading}
            />
            {mode === 'signup' && (
              <small style={{ color: '#718096', fontSize: '0.9rem' }}>
                Password must be at least 6 characters
              </small>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
              setMessage('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea', 
              cursor: 'pointer',
              fontSize: '16px',
              textDecoration: 'underline'
            }}
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      
      <div className="card" style={{ maxWidth: '800px', margin: '20px auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#667eea', 
          fontSize: '24px', 
          marginBottom: '20px'
        }}>
          Premium Course Information
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
          border: '2px solid #e2e8f0',
          borderRadius: '10px',
          padding: '30px',
          lineHeight: '1.8',
          color: '#2d3748'
        }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>Welcome to iiskills.cloud!</strong> This comprehensive Data Science course includes:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>6 comprehensive modules covering AI, ML, and Data Science</li>
            <li>Interactive quizzes with instant feedback</li>
            <li>Industry-recognized certification (Gold/Silver/Bronze)</li>
            <li>Community forum for peer learning</li>
            <li>One year subscription access</li>
          </ul>
          <p>
            <strong>Course Fee:</strong> ₹99 + GST (18%) = <strong>₹116.82</strong>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '15px' }}>
            Create your account to get started. Payment integration coming soon!
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Login;
