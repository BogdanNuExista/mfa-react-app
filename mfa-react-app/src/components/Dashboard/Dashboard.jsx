import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, isMfaVerified } = useAuth(); // Add isMfaVerified
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState({
    lastLogin: new Date().toLocaleString(),
    loginCount: Math.floor(Math.random() * 10) + 1,
    securityScore: Math.floor(Math.random() * 30) + 70
  });
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);
  
  // Get user's first name from email
  const getUserFirstName = () => {
    if (!currentUser || !currentUser.email) return '';
    const emailParts = currentUser.email.split('@');
    const nameParts = emailParts[0].split('.');
    return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            {greeting}, {getUserFirstName()}!
          </h1>
          <p className="welcome-text">Welcome to your secure dashboard</p>
        </div>
        
        <div className="user-info-card">
          <div className="user-avatar">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {getUserFirstName().charAt(0)}
              </div>
            )}
          </div>
          <div className="user-details">
            <h3>{currentUser?.displayName || getUserFirstName()}</h3>
            <p>{currentUser?.email}</p>
            {isMfaVerified && ( // Only show verified badge if MFA is verified
              <p className="verified-badge">
                <span className="icon">✓</span> MFA Verified
              </p>
            )}
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Security Status</h3>
            <div className="security-score">
              <div className="score-ring">
                <div className="score-value">{stats.securityScore}</div>
              </div>
              <div className="score-label">Security Score</div>
            </div>
            <ul className="security-details">
              <li className="active">
                <span className="icon">✓</span> Two-factor authentication
              </li>
              <li className="active">
                <span className="icon">✓</span> Email verification
              </li>
              <li className="inactive">
                <span className="icon">○</span> Recovery phone number
              </li>
            </ul>
          </div>
          
          <div className="dashboard-card">
            <h3>Account Activity</h3>
            <div className="activity-item">
              <div className="activity-icon login-icon">
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <div className="activity-details">
                <p className="activity-title">Last login</p>
                <p className="activity-time">{stats.lastLogin}</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon count-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="activity-details">
                <p className="activity-title">Login count</p>
                <p className="activity-count">{stats.loginCount}</p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3>Security Tips</h3>
            <ul className="tips-list">
              <li>Use a strong, unique password for each service</li>
              <li>Keep your authentication app updated</li>
              <li>Never share your verification codes with anyone</li>
              <li>Regularly check your account activity</li>
            </ul>
          </div>
          
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-button">
                <span className="action-icon">🔄</span>
                Reset MFA
              </button>
              <button className="action-button">
                <span className="action-icon">🔒</span>
                Change Password
              </button>
              <button className="action-button">
                <span className="action-icon">📱</span>
                Update Phone
              </button>
              <button className="action-button">
                <span className="action-icon">🚨</span>
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;