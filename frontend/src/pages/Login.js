import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/auth/send-otp', { phoneNumber });
      if (response.data.success) {
        setOtpSent(true);
        setDevOtp(response.data.devOtp); // Only for development
        alert(`OTP sent to ${phoneNumber}. For testing: ${response.data.devOtp}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/auth/verify-otp', { phoneNumber, otp });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/images/iiskills.png" alt="iiskills.cloud" style={{ height: '80px', width: 'auto' }} />
            <span style={{ color: '#2d3748', fontSize: '14px', fontWeight: '500', maxWidth: '200px', lineHeight: '1.4' }}>
              Indian Institute of Professional Skills Development
            </span>
          </div>
          <div>
            <img src="/images/ai-cloud.png" alt="AI Cloud Enterprises" style={{ height: '80px', width: 'auto' }} />
          </div>
        </div>
      </div>
      
      <h1>🎓 Learn Data Science</h1>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
        AI Cloud Enterprises
      </h2>
      <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '30px', fontWeight: 'normal' }}>
        Master AI/ML for the Indian Job Market
      </h3>
      
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Login with OTP</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <label>
              <strong>Phone Number</strong>
            </label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength="10"
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="alert alert-info">
              OTP sent to {phoneNumber}
              {devOtp && <div><strong>Test OTP: {devOtp}</strong></div>}
            </div>
            
            <label>
              <strong>Enter OTP</strong>
            </label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength="6"
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => { setOtpSent(false); setOtp(''); }}
            >
              Change Phone Number
            </button>
          </form>
        )}
        
        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#718096' }}>
          <p>Admin? <a href="/admin/login" style={{ color: '#667eea' }}>Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
