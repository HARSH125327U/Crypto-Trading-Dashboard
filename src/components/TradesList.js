// src/components/TradesList.js
import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, X } from 'lucide-react';

const TradesList = ({ trades, botId, onClose }) => {
  if (!trades || trades.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h3>No trades yet</h3>
        <p>This bot hasn't executed any trades</p>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Trade History</h2>
        <button onClick={onClose} style={styles.closeIconButton}>
          <X size={24} />
        </button>
      </div>

      <div style={styles.tradesList}>
        {trades.map((trade) => (
          <div key={trade.tradeId} style={styles.tradeCard}>
            <div style={styles.tradeHeader}>
              <div style={styles.tradeIcon}>
                {trade.action === 'BUY' ? (
                  <ArrowUpCircle size={24} color="#10b981" />
                ) : (
                  <ArrowDownCircle size={24} color="#ef4444" />
                )}
              </div>
              <div style={styles.tradeInfo}>
                <div style={styles.tradeAction}>
                  <span style={{
                    ...styles.actionBadge,
                    backgroundColor: trade.action === 'BUY' ? '#d1fae5' : '#fee2e2',
                    color: trade.action === 'BUY' ? '#065f46' : '#991b1b'
                  }}>
                    {trade.action}
                  </span>
                  <span style={styles.tradePair}>{trade.tradingPair}</span>
                </div>
                <div style={styles.tradeDetails}>
                  <span style={styles.detailLabel}>Price:</span>
                  <span style={styles.detailValue}>${parseFloat(trade.price).toFixed(2)}</span>
                </div>
                {trade.amount && (
                  <div style={styles.tradeDetails}>
                    <span style={styles.detailLabel}>Amount:</span>
                    <span style={styles.detailValue}>{parseFloat(trade.amount).toFixed(4)}</span>
                  </div>
                )}
                <div style={styles.tradeDetails}>
                  <span style={styles.detailLabel}>Date:</span>
                  <span style={styles.detailValue}>
                    {new Date(trade.executedAt || trade.timestamp * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '2rem',
    marginTop: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeIconButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  tradesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  tradeCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
  },
  tradeHeader: {
    display: 'flex',
    gap: '1rem',
  },
  tradeIcon: {
    flexShrink: 0,
  },
  tradeInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  tradeAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  actionBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  tradePair: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  tradeDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
  },
  detailLabel: {
    color: '#6b7280',
  },
  detailValue: {
    color: '#1f2937',
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '3rem',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '1rem',
    padding: '10px 24px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  }
};

export default TradesList;