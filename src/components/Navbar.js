// src/components/Navbar.js
import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = ({ connectionStatus }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.logo}>
          <Activity size={24} style={{ marginRight: '10px' }} />
          <h1 style={styles.title}>Crypto Trading Bot</h1>
        </div>
        <div style={styles.status}>
          <div style={{
            ...styles.statusDot,
            backgroundColor: connectionStatus === 'connected' ? '#10b981' : '#ef4444'
          }} />
          <span style={styles.statusText}>
            {connectionStatus === 'connected' ? 'AWS Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '8px',
  },
  statusText: {
    fontSize: '0.875rem',
  }
};

export default Navbar;