// src/components/MarketData.js
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MarketData = () => {
  const [prices, setPrices] = useState({
    BTCUSDT: { price: 0, change: 0 },
    ETHUSDT: { price: 0, change: 0 },
    BNBUSDT: { price: 0, change: 0 }
  });

  useEffect(() => {
    // Fetch real prices from CoinGecko
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        
        setPrices({
          BTCUSDT: {
            price: data.bitcoin.usd,
            change: data.bitcoin.usd_24h_change
          },
          ETHUSDT: {
            price: data.ethereum.usd,
            change: data.ethereum.usd_24h_change
          },
          BNBUSDT: {
            price: data.binancecoin.usd,
            change: data.binancecoin.usd_24h_change
          }
        });
      } catch (error) {
        console.error('Failed to fetch prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const renderPriceCard = (symbol, name) => {
    const data = prices[symbol];
    const isPositive = data.change >= 0;

    return (
      <div key={symbol} style={styles.priceCard}>
        <div style={styles.priceHeader}>
          <Activity size={20} color="#3b82f6" />
          <span style={styles.priceName}>{name}</span>
        </div>
        <div style={styles.priceAmount}>
          ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={styles.priceChange}>
          {isPositive ? (
            <TrendingUp size={16} color="#10b981" />
          ) : (
            <TrendingDown size={16} color="#ef4444" />
          )}
          <span style={{
            color: isPositive ? '#10b981' : '#ef4444',
            fontWeight: '600'
          }}>
            {isPositive ? '+' : ''}{data.change.toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Market Data</h2>
      <div style={styles.priceGrid}>
        {renderPriceCard('BTCUSDT', 'Bitcoin')}
        {renderPriceCard('ETHUSDT', 'Ethereum')}
        {renderPriceCard('BNBUSDT', 'Binance Coin')}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  priceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
  },
  priceCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    padding: '1.5rem',
  },
  priceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '0.5rem',
  },
  priceName: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '600',
  },
  priceAmount: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  priceChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.875rem',
  }
};

export default MarketData;