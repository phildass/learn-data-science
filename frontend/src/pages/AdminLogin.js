import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LogoBar from '../components/LogoBar';
import Footer from '../components/Footer';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // The AuthContext will check if user is admin
      // AdminRoute will handle redirect if not admin
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <LogoBar />
      
      <h1 style={{ color: 'white', textAlign: 'center', margin: '30px 0' }}>
        🔐 Admin Portal
      </h1>
      
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#667eea' }}>Admin Access</h2>
        <p style={{ textAlign: 'center', color: '#718096', marginBottom: '30px' }}>
          Login with your admin account credentials
        </p>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@iiskills.cloud"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Admin Panel'}
          </button>
        </form>
        
        <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
          <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Admin Requirements:</h4>
          <ul style={{ color: '#718096', fontSize: '0.9rem', marginLeft: '20px' }}>
            <li>Account must have admin role in Supabase</li>
            <li>Contact system administrator to get admin access</li>
            <li>See SUPABASE_SETUP.md for role configuration</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="/login" style={{ color: '#667eea', textDecoration: 'underline' }}>
            ← Back to Student Login
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default AdminLogin;
