import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';

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
    <div className="admin-container" style={{padding: '20px'}}>
      <h1>System Admin Panel</h1>
      <p style={{marginBottom: '20px', color: '#6b7280'}}>Welcome Admin! View all global system uploads here.</p>
      
      <table style={{width: '100%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderCollapse: 'collapse'}}>
        <thead style={{backgroundColor: '#f3f4f6'}}>
          <tr>
            <th style={{padding: '12px', textAlign: 'left'}}>Image</th>
            <th style={{padding: '12px', textAlign: 'left'}}>User ID</th>
            <th style={{padding: '12px', textAlign: 'left'}}>Category</th>
            <th style={{padding: '12px', textAlign: 'left'}}>Confidence</th>
            <th style={{padding: '12px', textAlign: 'left'}}>Feedback</th>
            <th style={{padding: '12px', textAlign: 'left'}}>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((log) => (
            <tr key={log._id} style={{borderBottom: '1px solid #e5e7eb'}}>
              <td style={{padding: '12px'}}><img src={`http://localhost:5000${log.imageUrl}`} alt="upload" style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'}} /></td>
              <td style={{padding: '12px', fontSize: '0.9em', color: '#6b7280'}}>{log.user || 'Anonymous'}</td>
              <td style={{padding: '12px'}}>
                <span className={`category-badge ${log.category.toLowerCase()}`} style={{padding: '4px 8px', borderRadius: '9999px', fontSize: '0.8em'}}>
                  {log.category}
                </span>
              </td>
              <td style={{padding: '12px'}}>{(log.confidence * 100).toFixed(1)}%</td>
              <td style={{padding: '12px'}}>
                {log.feedback ? (
                  log.feedback.isCorrect ? <span style={{color: 'green'}}>Correct</span> : <span style={{color: 'red'}}>Flagged</span>
                ) : <span style={{color: '#9ca3af'}}>None</span>}
              </td>
              <td style={{padding: '12px'}}>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {history.length === 0 && (
            <tr><td colSpan="6" style={{padding: '20px', textAlign: 'center'}}>No uploads found in the system.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
