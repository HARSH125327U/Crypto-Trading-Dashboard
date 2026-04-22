// src/components/BotCard.js
import React, { useState } from 'react';
import { TrendingUp, Power, Edit2, Trash2, Eye } from 'lucide-react';

const BotCard = ({ bot, onUpdate, onDelete, onViewTrades }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    active: bot.active,
    riskLevel: bot.riskLevel
  });

  const handleToggle = async () => {
    try {
      await onUpdate(bot.botId, { active: !bot.active });
    } catch (error) {
      console.error('Failed to toggle bot');
    }
  };

  const handleSaveEdit = async () => {
    try {
      await onUpdate(bot.botId, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update bot');
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.headerLeft}>
          <TrendingUp 
            size={24} 
            color={bot.active ? '#10b981' : '#6b7280'} 
          />
          <h3 style={styles.cardTitle}>{bot.tradingPair}</h3>
        </div>
        <div style={styles.headerRight}>
          <button
            onClick={handleToggle}
            style={{
              ...styles.iconButton,
              backgroundColor: bot.active ? '#10b981' : '#6b7280'
            }}
            title={bot.active ? 'Deactivate' : 'Activate'}
          >
            <Power size={16} color="white" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={styles.iconButton}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onViewTrades(bot.botId)}
            style={styles.iconButton}
            title="View Trades"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this bot?')) {
                onDelete(bot.botId);
              }
            }}
            style={{...styles.iconButton, ...styles.deleteButton}}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Strategy:</span>
          <span style={styles.value}>{bot.strategy.replace(/_/g, ' ').toUpperCase()}</span>
        </div>

        {isEditing ? (
          <>
            <div style={styles.infoRow}>
              <span style={styles.label}>Risk Level:</span>
              <select
                value={editData.riskLevel}
                onChange={(e) => setEditData({...editData, riskLevel: e.target.value})}
                style={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={styles.buttonGroup}>
              <button onClick={handleSaveEdit} style={styles.saveButton}>
                Save
              </button>
              <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={styles.infoRow}>
              <span style={styles.label}>Risk Level:</span>
              <span style={styles.value}>{bot.riskLevel.toUpperCase()}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Max Trade Amount:</span>
              <span style={styles.value}>${bot.maxTradeAmount}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Status:</span>
              <span style={{
                ...styles.badge,
                backgroundColor: bot.active ? '#d1fae5' : '#fee2e2',
                color: bot.active ? '#065f46' : '#991b1b'
              }}>
                {bot.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '1.5rem',
    marginBottom: '1rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerRight: {
    display: 'flex',
    gap: '8px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  iconButton: {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  deleteButton: {
    borderColor: '#ef4444',
    color: '#ef4444',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  value: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: '0.875rem',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  select: {
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  saveButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  }
};

export default BotCard;