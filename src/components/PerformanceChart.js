// src/components/PerformanceChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const PerformanceChart = ({ trades }) => {
  if (!trades || trades.length === 0) {
    return (
      <div style={styles.emptyState}>
        <BarChart3 size={48} color="#9ca3af" />
        <p style={styles.emptyText}>No trade data available</p>
      </div>
    );
  }

  // Process trades for chart
  const chartData = trades
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((trade, index) => {
      const date = new Date(trade.timestamp * 1000);
      return {
        name: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        price: parseFloat(trade.price),
        action: trade.action,
        index: index + 1
      };
    });

  // Calculate statistics
  const totalTrades = trades.length;
  const buyTrades = trades.filter(t => t.action === 'BUY').length;
  const sellTrades = trades.filter(t => t.action === 'SELL').length;
  const avgPrice = trades.reduce((sum, t) => sum + parseFloat(t.price), 0) / totalTrades;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Performance Analytics</h2>
      
      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Trades</div>
          <div style={styles.statValue}>{totalTrades}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Buy Orders</div>
          <div style={{...styles.statValue, color: '#10b981'}}>{buyTrades}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Sell Orders</div>
          <div style={{...styles.statValue, color: '#ef4444'}}>{sellTrades}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg Price</div>
          <div style={styles.statValue}>${avgPrice.toFixed(2)}</div>
        </div>
      </div>

      {/* Chart */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Trade Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '2rem',
    marginTop: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  chartContainer: {
    marginTop: '1.5rem',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '4rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: '1rem',
  }
};

export default PerformanceChart;