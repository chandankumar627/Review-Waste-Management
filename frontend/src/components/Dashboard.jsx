import React, { useState, useEffect } from 'react';
import { getStats, getHistory } from '../services/api';
import StatsCard from './StatsCard';
import WasteChart from './WasteChart';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, historyData] = await Promise.all([
        getStats(),
        getHistory(1, 10)
      ]);
      
      setStats(statsData.data);
      setHistory(historyData.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <div className={`ai-status ${stats?.aiStatus === 'Active' ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          AI System: {stats?.aiStatus || 'Unknown'}
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Today's Predictions"
          value={stats?.todayCount || 0}
          icon="📊"
          color="#3b82f6"
        />
        <StatsCard
          title="Total Predictions"
          value={stats?.totalPredictions || 0}
          icon="📈"
          color="#10b981"
        />
        <StatsCard
          title="Latest Category"
          value={stats?.latestPrediction?.category || 'N/A'}
          icon="🗑️"
          color="#f59e0b"
        />
        <StatsCard
          title="Latest Confidence"
          value={stats?.latestPrediction ? `${(stats.latestPrediction.confidence * 100).toFixed(0)}%` : 'N/A'}
          icon="✓"
          color="#8b5cf6"
        />
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <WasteChart data={stats?.categoryStats || []} />
        </div>

        <div className="history-section">
          <h2>Recent Predictions</h2>
          <div className="history-list">
            {history.length > 0 ? (
              history.map((item) => (
                <div key={item._id} className="history-item">
                  <div className="history-image">
                    <img 
                      src={`http://localhost:5000${item.imageUrl}`} 
                      alt="Waste" 
                    />
                  </div>
                  <div className="history-details">
                    <span className={`category-badge ${item.category.toLowerCase()}`}>
                      {item.category}
                    </span>
                    <p className="confidence">{(item.confidence * 100).toFixed(0)}% confidence</p>
                    <p className="timestamp">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-history">No predictions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
