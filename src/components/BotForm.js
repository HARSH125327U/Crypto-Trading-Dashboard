// src/components/BotForm.js
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const BotForm = ({ onCreateBot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    strategy: 'simple_moving_average',
    tradingPair: 'BTCUSDT',
    maxTradeAmount: 100,
    riskLevel: 'medium',
    active: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreateBot(formData);
      setIsOpen(false);
      setFormData({
        strategy: 'simple_moving_average',
        tradingPair: 'BTCUSDT',
        maxTradeAmount: 100,
        riskLevel: 'medium',
        active: true
      });
    } catch (error) {
      alert('Failed to create bot');
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} style={styles.openButton}>
        <Plus size={20} />
        <span>Create New Bot</span>
      </button>
    );
  }

  return (
    <div style={styles.formCard}>
      <h2 style={styles.formTitle}>Create New Trading Bot</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Strategy</label>
          <select
            value={formData.strategy}
            onChange={(e) => setFormData({...formData, strategy: e.target.value})}
            style={styles.input}
            required
          >
            <option value="simple_moving_average">Simple Moving Average</option>
            <option value="rsi">RSI (Relative Strength Index)</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Trading Pair</label>
          <select
            value={formData.tradingPair}
            onChange={(e) => setFormData({...formData, tradingPair: e.target.value})}
            style={styles.input}
            required
          >
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Max Trade Amount ($)</label>
          <input
            type="number"
            value={formData.maxTradeAmount}
            onChange={(e) => setFormData({...formData, maxTradeAmount: parseFloat(e.target.value)})}
            style={styles.input}
            min="1"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Risk Level</label>
          <select
            value={formData.riskLevel}
            onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
            style={styles.input}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              style={styles.checkbox}
            />
            <span>Activate immediately</span>
          </label>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Create Bot
          </button>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)} 
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  openButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '2rem',
    marginBottom: '2rem',
  },
  formTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    color: '#374151',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  }
};

export default BotForm;