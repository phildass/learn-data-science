import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>iiskills.cloud</h3>
          <p>Indian Institute of Professional Skills Development</p>
          <p>Empowering India with AI/ML and Data Science Skills</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="https://iiskills.cloud/about" target="_blank" rel="noopener noreferrer">About Us</a></li>
            <li><a href="https://iiskills.cloud/courses" target="_blank" rel="noopener noreferrer">Courses</a></li>
            <li><a href="https://iiskills.cloud/careers" target="_blank" rel="noopener noreferrer">Careers</a></li>
            <li><a href="https://iiskills.cloud/contact" target="_blank" rel="noopener noreferrer">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://iiskills.cloud/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="https://iiskills.cloud/community" target="_blank" rel="noopener noreferrer">Community</a></li>
            <li><a href="https://iiskills.cloud/support" target="_blank" rel="noopener noreferrer">Support</a></li>
            <li><a href="https://iiskills.cloud/faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <p>Email: info@iiskills.cloud</p>
          <p>Phone: +91 XXX XXX XXXX</p>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 iiskills.cloud - AI Cloud Enterprises. All rights reserved.</p>
        <p>Made with ❤️ for aspiring Data Scientists in India</p>
      </div>
    </footer>
  );
};

export default Footer;
