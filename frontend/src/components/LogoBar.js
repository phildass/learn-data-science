import React from 'react';

const LogoBar = () => {
  return (
    <div className="logo-bar">
      <div className="logo-bar-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img 
              src="/images/iiskills.png" 
              alt="iiskills.cloud" 
              style={{ height: '80px', width: 'auto' }} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ 
              color: '#2d3748', 
              fontSize: '14px', 
              fontWeight: '500', 
              maxWidth: '200px', 
              lineHeight: '1.4' 
            }}>
              iiskills.cloud - Indian Institute of Professional Skills Development
            </span>
          </div>
          <div>
            <img 
              src="/images/ai-cloud.png" 
              alt="AI Cloud Enterprises" 
              style={{ height: '80px', width: 'auto' }} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
        <div className="logo-bar-actions">
          <a 
            href="https://iiskills.cloud" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link"
          >
            Home
          </a>
          <a 
            href="https://iiskills.cloud/courses" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link"
          >
            Courses
          </a>
          <a 
            href="https://iiskills.cloud/contact" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link secondary"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoBar;
