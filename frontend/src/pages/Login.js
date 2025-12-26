import React from 'react';

function Login({ setUser }) {
  return (
    <div className="container">
      <div className="logo-bar">
        <div className="logo-bar-nav">
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
          <div className="logo-bar-actions">
            <a 
              href="https://iiskills.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link"
            >
              Register
            </a>
            <a 
              href="https://iiskills.com/payment" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link secondary"
            >
              Make Payment
            </a>
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
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#667eea', 
          fontSize: '28px', 
          marginBottom: '30px',
          fontWeight: '700'
        }}>
          Premium Course Information
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
          border: '3px solid #667eea',
          borderRadius: '15px',
          padding: '40px',
          marginBottom: '20px',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.15)'
        }}>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#2d3748',
            textAlign: 'justify',
            margin: '0'
          }}>
            For a <strong>Premium Course</strong>, you have to register yourself compulsorily at <strong>iiskills.com</strong> and make a payment of <strong>Rs 99</strong> plus <strong>GST of 18% (₹17.82)</strong> with the total amount payable <strong>Rs 116.82</strong>. This makes you eligible to participate in the course. You will have a <strong>one year subscription</strong> whereby you can complete your course and avail the certificate. In case you are not satisfied with your results, you can retake the course by making the payment again. As soon as you make the payment enter the OTP you will receive on your phone and email id and you can view the course. <strong>Good luck.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
