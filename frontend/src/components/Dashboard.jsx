import React, { useState, useEffect } from 'react';
import { getStats, getHistory } from '../services/api';
import StatsCard from './StatsCard';
import WasteChart from './WasteChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend as LineLegend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, Cuboid, Leaf, Globe, CheckCircle, XCircle } from 'lucide-react';
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

  // Calculate environmental impacts from history
  const totalSavedLandfill = history.reduce((sum, item) => sum + (item.environmentalImpact?.savedLandfillKg || 0), 0);
  const totalCo2Reduced = history.reduce((sum, item) => sum + (item.environmentalImpact?.co2ReducedKg || 0), 0);
  const totalTiles = history.reduce((sum, item) => sum + (item.environmentalImpact?.interlockingTiles || 0), 0);

  // Generate mock daily trends from history data for the line chart
  const trendsData = history.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    const existing = acc.find(d => d.date === date);
    if(existing) {
      existing.uploads += 1;
    } else {
      acc.push({ date, uploads: 1 });
    }
    return acc;
  }, []).reverse();

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
          icon={<BarChart3 size={24} />}
          color="var(--color-secondary)"
        />
        <StatsCard
          title="Total Predictions"
          value={stats?.totalPredictions || 0}
          icon={<TrendingUp size={24} />}
          color="var(--color-primary)"
        />
        <StatsCard
          title="Potential Tiles"
          value={`${totalTiles} tiles`}
          icon={<Cuboid size={24} />}
          color="var(--color-accent)"
        />
        <StatsCard
          title="Saved Landfill"
          value={`${totalSavedLandfill.toFixed(1)} kg`}
          icon={<Leaf size={24} />}
          color="var(--color-warning)"
        />
        <StatsCard
          title="CO₂ Reduced"
          value={`${totalCo2Reduced.toFixed(1)} kg`}
          icon={<Globe size={24} />}
          color="var(--color-secondary-dark)"
        />
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <WasteChart data={stats?.categoryStats || []} />
          
          <div className="trends-chart">
            <h2>Daily Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <LineTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <LineLegend />
                <Line type="monotone" dataKey="uploads" stroke="var(--color-secondary)" activeDot={{ r: 8 }} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
                    {item.feedback && (
                      <p className={`feedback-badge ${item.feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                        {item.feedback.isCorrect ? <><CheckCircle size={14}/> Correct</> : <><XCircle size={14}/> Flagged</>}
                      </p>
                    )}
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
