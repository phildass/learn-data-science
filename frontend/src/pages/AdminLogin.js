import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/admin/login', { username, password });
      if (response.data.success) {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🔐 AI Cloud Enterprises - Admin Login</h1>
      <div style={{ textAlign: 'center', color: 'white', fontSize: '14px', marginBottom: '20px' }}>
        iiskills.cloud
      </div>
      
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Admin Access</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <label>
            <strong>Username</strong>
          </label>
          <input
            type="text"
            placeholder="Enter admin username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <label>
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#718096' }}>
            Default credentials: phil123 / phil123
          </p>
          <p style={{ fontSize: '14px', color: '#718096', marginTop: '10px' }}>
            <a href="/login" style={{ color: '#667eea' }}>← Back to User Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
