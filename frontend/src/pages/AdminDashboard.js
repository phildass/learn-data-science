import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [modules, setModules] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [usersRes, statsRes, modulesRes, quizRes] = await Promise.all([
        axios.get('/admin/users'),
        axios.get('/admin/stats'),
        axios.get('/admin/modules'),
        axios.get('/admin/quiz')
      ]);

      setUsers(usersRes.data.users || []);
      setStats(statsRes.data.stats);
      setModules(modulesRes.data.modules || []);
      setQuiz(quizRes.data.quiz || []);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login');
      } else {
        console.error('Failed to load admin data', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/admin/logout');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (filter !== 'all') params.append('filter', filter);
      
      const response = await axios.get(`/admin/users/search?${params}`);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await axios.get('/admin/export/users', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/change-password', {
        currentPassword,
        newPassword
      });
      
      if (response.data.success) {
        alert('Password changed successfully!');
        setShowChangePassword(false);
        setCurrentPassword('');
        setNewPassword('');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to change password');
    }
  };

  const viewUserDetails = async (phoneNumber) => {
    try {
      const response = await axios.get(`/admin/users/${phoneNumber}`);
      setSelectedUser(response.data.user);
    } catch (error) {
      console.error('Failed to load user details', error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="logo-bar">
        <h1 style={{ margin: 0 }}>🔐 AI Cloud Enterprises - Admin Dashboard</h1>
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#718096' }}>
          iiskills.cloud
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Management Panel</h2>
          <div>
            <button onClick={() => setShowChangePassword(!showChangePassword)} className="btn btn-secondary">
              Change Password
            </button>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>

        {showChangePassword && (
          <form onSubmit={handleChangePassword} style={{ marginTop: '20px', padding: '20px', background: '#f7fafc', borderRadius: '10px' }}>
            <h3>Change Admin Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Update Password</button>
            <button type="button" onClick={() => setShowChangePassword(false)} className="btn btn-secondary">Cancel</button>
          </form>
        )}
      </div>

      {stats && (
        <div className="card">
          <h2>Platform Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#667eea' }}>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#48bb78' }}>{stats.paidUsers}</h3>
              <p>Paid Users</p>
            </div>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#f6ad55' }}>{stats.certifiedUsers}</h3>
              <p>Certified Users</p>
            </div>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#ffd700' }}>{stats.goldCertificates}</h3>
              <p>Gold Certificates</p>
            </div>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#c0c0c0' }}>{stats.silverCertificates}</h3>
              <p>Silver Certificates</p>
            </div>
            <div style={{ padding: '20px', background: '#edf2f7', borderRadius: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#cd7f32' }}>{stats.bronzeCertificates}</h3>
              <p>Bronze Certificates</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h2>User Management</h2>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: '1', minWidth: '200px' }}
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '12px', border: '2px solid #e2e8f0', borderRadius: '5px' }}
          >
            <option value="all">All Users</option>
            <option value="certified">Certified</option>
            <option value="not-certified">Not Certified</option>
            <option value="paid">Paid</option>
            <option value="pending-payment">Pending Payment</option>
          </select>
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
          <button onClick={() => { setSearchQuery(''); setFilter('all'); loadAdminData(); }} className="btn btn-secondary">
            Reset
          </button>
          <button onClick={handleExportCSV} className="btn btn-success">
            📥 Export CSV
          </button>
        </div>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#edf2f7' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Phone Number</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Created</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Payment</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Modules</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Quiz Score</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Certificate</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #cbd5e0' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.phoneNumber} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{user.phoneNumber}</td>
                    <td style={{ padding: '12px' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`badge ${user.paymentStatus === 'completed' ? 'badge-success' : ''}`}>
                        {user.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{user.progress.completedModules.length}/6</td>
                    <td style={{ padding: '12px' }}>{user.progress.quizScore ? `${user.progress.quizScore}%` : 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      {user.progress.certificateEarned ? (
                        <span className={`badge badge-${user.progress.passLevel}`}>
                          {user.progress.passLevel}
                        </span>
                      ) : (
                        'No'
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => viewUserDetails(user.phoneNumber)} className="btn btn-primary" style={{ padding: '5px 15px', fontSize: '14px' }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>User Details: {selectedUser.phoneNumber}</h2>
            <button onClick={() => setSelectedUser(null)} className="btn btn-secondary">Close</button>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h3>Progress Information</h3>
            <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Payment Status:</strong> {selectedUser.paymentStatus}</p>
            <p><strong>Completed Modules:</strong> {selectedUser.progress.completedModules.join(', ') || 'None'}</p>
            <p><strong>Quiz Score:</strong> {selectedUser.progress.quizScore ? `${selectedUser.progress.quizScore}%` : 'Not taken'}</p>
            <p><strong>Certificate:</strong> {selectedUser.progress.certificateEarned ? `Yes (${selectedUser.progress.passLevel})` : 'No'}</p>
            <p><strong>Quiz Attempts:</strong> {selectedUser.progress.quizAttempts.length}</p>
          </div>

          {selectedUser.progress.quizAttempts.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Quiz History</h3>
              <table style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                  <tr style={{ background: '#edf2f7' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Score</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Percentage</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.progress.quizAttempts.map((attempt, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px' }}>{new Date(attempt.timestamp).toLocaleString()}</td>
                      <td style={{ padding: '10px' }}>{attempt.score}/{attempt.totalQuestions}</td>
                      <td style={{ padding: '10px' }}>{attempt.percentage}%</td>
                      <td style={{ padding: '10px' }}>
                        {attempt.passLevel ? (
                          <span className={`badge badge-${attempt.passLevel}`}>{attempt.passLevel}</span>
                        ) : (
                          'Failed'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="card">
        <h2>Course Modules ({modules.length})</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {modules.map((module) => (
            <div key={module.id} style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px' }}>
              <h3>Module {module.id}: {module.title}</h3>
              <p style={{ color: '#718096' }}>{module.description}</p>
              <p style={{ fontSize: '14px', color: '#a0aec0' }}>Duration: {module.duration}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Quiz Questions ({quiz.length})</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          {quiz.map((q, index) => (
            <div key={q.id} style={{ padding: '20px', background: '#f7fafc', borderRadius: '10px' }}>
              <h3>Question {index + 1}</h3>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>{q.question}</p>
              <ul style={{ marginLeft: '20px' }}>
                {q.options.map((option, optIndex) => (
                  <li key={optIndex} style={{ 
                    marginBottom: '5px',
                    color: optIndex === q.correctAnswer ? '#48bb78' : '#2d3748',
                    fontWeight: optIndex === q.correctAnswer ? '600' : 'normal'
                  }}>
                    {option} {optIndex === q.correctAnswer && '✓ (Correct)'}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '10px', padding: '10px', background: '#e6fffa', borderRadius: '5px' }}>
                <strong>Explanation:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
