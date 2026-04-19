import React from 'react';

const About = () => {
  return (
    <div style={{
      minHeight: '85vh',
      padding: '40px 20px',
      background: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent 40%), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.1), transparent 40%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        padding: '50px', 
        maxWidth: '850px', 
        margin: '0 auto', 
        background: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '15px', 
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>About ReVive</h1>
          <p style={{ color: '#64748b', fontSize: '1.25rem', fontWeight: '500' }}>AI-Powered Waste Management System</p>
        </div>

        <div style={{ marginBottom: '40px', padding: '30px', background: 'rgba(255,255,255,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <h2 style={{ color: '#059669', marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎯</span> Our Mission
          </h2>
          <p style={{ lineHeight: '1.7', color: '#374151', fontSize: '1.15rem' }}>
            ReVive is designed to help individuals, communities, and organizations effectively sort waste to maximize recycling and minimize landfill impact. By leveraging machine learning, we aim to provide instant, actionable insights on how to dispose of waste properly.
          </p>
        </div>

        <div style={{ marginBottom: '40px', padding: '30px', background: 'rgba(255,255,255,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <h2 style={{ color: '#2563eb', marginBottom: '25px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⚙️</span> How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📷</div>
              <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>1. Upload Image</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>Take a photo of your waste item and upload it securely.</p>
            </div>
            <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🧠</div>
              <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>2. AI Analysis</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>Our AI analyzes proper classifications and material conditions.</p>
            </div>
            <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💡</div>
              <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>3. Get Advice</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>Receive step-by-step instructions on safe disposal methods.</p>
            </div>
            <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌍</div>
              <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>4. Track Impact</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.5' }}>Watch your personal CO₂ reduction and offsets grow!</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '30px', background: 'rgba(255,255,255,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
          <h2 style={{ color: '#7c3aed', marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💻</span> The Core Technology
          </h2>
          <p style={{ lineHeight: '1.7', color: '#374151', fontSize: '1.15rem' }}>
            This platform utilizes a high-performance stack consisting of a React Javascript frontend, a Node/Express backend powered by MongoDB, and an isolated Flask/Python microservice that runs computer-vision emulation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
