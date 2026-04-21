import React from 'react';
import { Target, Settings, Camera, BrainCircuit, Lightbulb, Globe, TerminalSquare } from 'lucide-react';

const About = () => {
  return (
    <div style={{
      minHeight: '85vh',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        padding: '50px', 
        maxWidth: '850px', 
        width: '100%',
        margin: '0 auto', 
        background: 'var(--color-bg-card)', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '15px', 
            color: 'var(--color-text-main)',
            fontWeight: '800',
            letterSpacing: '-1px'
          }}>About ReVive</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', fontWeight: '500' }}>AI-Powered Waste Management System</p>
        </div>

        <div style={{ marginBottom: '40px', padding: '30px', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target size={28} /> Our Mission
          </h2>
          <p style={{ lineHeight: '1.7', color: 'var(--color-text-main)', fontSize: '1.15rem' }}>
            ReVive is designed to help individuals, communities, and organizations effectively sort waste to maximize recycling and minimize landfill impact. By leveraging machine learning, we aim to provide instant, actionable insights on how to dispose of waste properly.
          </p>
        </div>

        <div style={{ marginBottom: '40px', padding: '30px', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-secondary-dark)', marginBottom: '25px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={28} /> How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ marginBottom: '15px', color: 'var(--color-text-main)' }}><Camera size={36} /></div>
              <h3 style={{ marginBottom: '10px', color: 'var(--color-text-main)' }}>1. Upload Image</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>Take a photo of your waste item and upload it securely.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ marginBottom: '15px', color: 'var(--color-text-main)' }}><BrainCircuit size={36} /></div>
              <h3 style={{ marginBottom: '10px', color: 'var(--color-text-main)' }}>2. AI Analysis</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>Our AI analyzes proper classifications and material conditions.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ marginBottom: '15px', color: 'var(--color-text-main)' }}><Lightbulb size={36} /></div>
              <h3 style={{ marginBottom: '10px', color: 'var(--color-text-main)' }}>3. Get Advice</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>Receive step-by-step instructions on safe disposal methods.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
              <div style={{ marginBottom: '15px', color: 'var(--color-text-main)' }}><Globe size={36} /></div>
              <h3 style={{ marginBottom: '10px', color: 'var(--color-text-main)' }}>4. Track Impact</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.5' }}>Watch your personal CO₂ reduction and offsets grow!</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '30px', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ color: 'var(--color-text-main)', marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TerminalSquare size={28} /> The Core Technology
          </h2>
          <p style={{ lineHeight: '1.7', color: 'var(--color-text-main)', fontSize: '1.15rem' }}>
            This platform utilizes a high-performance stack consisting of a React Javascript frontend, a Node/Express backend powered by MongoDB, and an isolated Flask/Python microservice that runs computer-vision emulation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
