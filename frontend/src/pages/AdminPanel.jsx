import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import { Shield } from 'lucide-react';

const AdminPanel = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // By default getHistory grabs the global history if the user is an admin.
      const data = await getHistory(1, 100);
      setHistory(data.data);
      setLoading(false);
    } catch(err) {
      setLoading(false);
    }
  };

  if(loading) return <div className="loading">Loading Admin Panel...</div>;

  return (
    <div className="admin-container" style={{padding: '0 0 20px 0'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{display:'flex', alignItems:'center', gap:'10px', fontSize: '2rem', letterSpacing: '-0.5px'}}>
          <Shield color="var(--color-primary)" size={32}/> System Admin Panel
        </h1>
        <p style={{color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '1.1rem'}}>Welcome Admin! View all global system uploads here.</p>
      </div>
      
      <div style={{background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
          <thead style={{backgroundColor: 'var(--color-bg-input)', borderBottom: '1px solid var(--color-border)'}}>
            <tr>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>Image</th>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>User ID</th>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>Category</th>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>Confidence</th>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>Feedback</th>
              <th style={{padding: '1rem', fontWeight: '600', color: 'var(--color-text-muted)'}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((log) => (
              <tr key={log._id} style={{borderBottom: '1px solid var(--color-border)', transition: 'background-color var(--transition-fast)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor='var(--color-bg-main)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor='transparent'}>
                <td style={{padding: '1rem'}}>
                  <img src={`http://localhost:5000${log.imageUrl}`} alt="upload" style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)'}} />
                </td>
                <td style={{padding: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)'}}>{log.user || 'Anonymous'}</td>
                <td style={{padding: '1rem'}}>
                  <span className={`category-badge ${log.category.toLowerCase()}`} style={{padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 'bold'}}>
                    {log.category}
                  </span>
                </td>
                <td style={{padding: '1rem', fontWeight: '500'}}>{(log.confidence * 100).toFixed(1)}%</td>
                <td style={{padding: '1rem'}}>
                  {log.feedback ? (
                    log.feedback.isCorrect ? <span style={{color: 'var(--color-success)', fontWeight: '600', fontSize: '0.9rem', background:'var(--color-primary-light)', padding:'0.2rem 0.6rem', borderRadius:'var(--radius-full)'}}>Correct</span> : <span style={{color: 'var(--color-danger)', fontWeight: '600', fontSize: '0.9rem', background:'#fee2e2', padding:'0.2rem 0.6rem', borderRadius:'var(--radius-full)'}}>Flagged</span>
                  ) : <span style={{color: 'var(--color-text-muted)'}}>None</span>}
                </td>
                <td style={{padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.95rem'}}>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr><td colSpan="6" style={{padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: '500'}}>No uploads found in the system.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
