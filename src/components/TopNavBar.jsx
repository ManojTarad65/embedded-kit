import React from 'react';
import { Settings, HelpCircle, Moon, Sun, User } from 'lucide-react';
import './TopNavBar.css';

export default function TopNavBar({ theme, toggleTheme, openHelp }) {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <div className="logo-container">
          <div className="logo-icon"></div>
          <h1 className="project-name">EVI Learning Studio</h1>
        </div>
        <span className="version-badge">v1.0</span>
      </div>
      
      <div className="nav-center">
        <div className="connection-status">
          <div className="status-dot connected"></div>
          <span>ST-Link Connected</span>
        </div>
      </div>

      <div className="nav-right">
        <button className="btn-icon" title="License" style={{ fontSize: '0.9rem', fontWeight: 'bold', padding: '8px 12px' }}>
          PRO
        </button>
        <button className="btn-icon" title="Help" onClick={openHelp}>
          <HelpCircle size={24} />
        </button>
        <button className="btn-icon" title="Settings">
          <Settings size={24} />
        </button>
        <button className="btn-icon" title="Toggle Theme" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <div className="user-profile">
          <User size={20} />
          <span>Student</span>
        </div>
      </div>
    </nav>
  );
}
