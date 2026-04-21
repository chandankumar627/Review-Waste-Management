import React, { useState } from 'react';
import { uploadWaste, submitFeedback } from '../services/api';
import { toast } from 'react-toastify';
import { UploadCloud, Image as ImageIcon, Copy, AlertTriangle, Leaf, Recycle, Settings, Lightbulb, Cuboid, Receipt, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import '../styles/UploadWaste.css';

const UploadWaste = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setFeedbackGiven(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setFeedbackGiven(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await uploadWaste(selectedFile);
      setResult(response.data);
      setLoading(false);
      
      // Notification
      if (response.data.category === 'Organic') {
        toast.success('Organic waste detected → compost recommended');
      } else {
        toast.info(`${response.data.category} detected → ${response.data.disposalSuggestion?.action}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setFeedbackGiven(false);
  };

  const handleFeedback = async (isCorrect) => {
    if (!result) return;
    try {
      await submitFeedback(result._id, { isCorrect, suggestedCategory: '' });
      setFeedbackGiven(true);
      toast.success('Thank you for your feedback!');
    } catch(err) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className="upload-waste">
      <div className="upload-container">
        <div className="upload-header">
          <h1>Upload Waste Image</h1>
          <p className="subtitle">Upload an image to classify waste type using our advanced AI engine</p>
        </div>

        <div className="upload-area">
          {!preview ? (
            <label 
              className={`file-input-label ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              <div className="upload-placeholder">
                <div className="upload-icon-wrapper">
                  <UploadCloud size={48} className="upload-icon" />
                </div>
                <h3>Drag & Drop your image here</h3>
                <p>or click to browse from your computer</p>
                <div className="upload-hint">Supports: JPG, PNG (Max 5MB)</div>
              </div>
            </label>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <button onClick={handleReset} className="btn-reset">
                <ImageIcon size={18} /> Choose Different Image
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )}

        {selectedFile && !result && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-upload"
          >
            {loading ? (
              <span className="loading-text">
                <Settings className="spin-icon" size={20}/> Analyzing...
              </span>
            ) : (
              <span>Analyze Waste</span>
            )}
          </button>
        )}

        {result && (
          <div className="result-container">
            <div className="result-header">
              <h2>Analysis Complete</h2>
            </div>
            
            <div className="result-card">
              <div className="result-top-section">
                <div className={`result-category ${result.category.toLowerCase()}`}>
                  <div className="category-icon-wrapper">
                    {result.category === 'Organic' ? <Leaf size={32}/> : 
                     result.category === 'Plastic' ? <Recycle size={32}/> : <Settings size={32}/>}
                  </div>
                  <div>
                    <h3>{result.category} Waste</h3>
                    <p className="category-desc">AI Classification Result</p>
                  </div>
                </div>

                <div className="result-details">
                  <p className="confidence-label">Confidence Level {(result.confidence * 100).toFixed(1)}%</p>
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="result-grid">
                {result.disposalSuggestion && (
                  <div className="info-box suggestion-box">
                    <h4>
                      <Lightbulb size={20} className="info-icon text-warning"/>
                      Smart Disposal Suggestion
                    </h4>
                    <div className="info-content">
                      <p className="action-highlight">{result.disposalSuggestion.action}</p>
                      <p>{result.disposalSuggestion.explanation}</p>
                    </div>
                  </div>
                )}

                {result.wasteFingerprint && (
                  <div className="info-box advanced-fingerprint">
                    <h4>
                      <Receipt size={20} className="info-icon text-secondary"/>
                      Waste Fingerprint
                    </h4>
                    <ul className="info-content">
                      <li><strong>Condition:</strong> <span>{result.wasteFingerprint.condition}</span></li>
                      <li><strong>Recyclable:</strong> <span>{result.wasteFingerprint.recyclable ? 'Yes' : 'No'}</span></li>
                      <li><strong>Decomposition:</strong> <span>{result.wasteFingerprint.decompositionTime}</span></li>
                    </ul>
                  </div>
                )}

                {result.environmentalImpact && (
                  <div className="info-box environmental-impact">
                    <h4>
                      <Leaf size={20} className="info-icon text-primary"/>
                      Environmental Impact
                    </h4>
                    <div className="info-content">
                      <p>You saved <strong>{result.environmentalImpact.savedLandfillKg} kg</strong> of landfill volume.</p>
                      <p><strong>{result.environmentalImpact.co2ReducedKg} kg</strong> of CO₂ emissions reduced.</p>
                      {result.environmentalImpact.interlockingTiles > 0 && (
                        <div className="tiles-highlight">
                          <Cuboid size={20} />
                          <p>Potential to manufacture <strong>{result.environmentalImpact.interlockingTiles} interlocking tiles</strong> from this plastic waste!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="result-footer">
                <p className="result-timestamp">
                  Analyzed at: {new Date(result.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            {!feedbackGiven && (
              <div className="feedback-section">
                <p className="feedback-prompt">Help us improve! Was this prediction correct?</p>
                <div className="feedback-actions">
                  <button onClick={() => handleFeedback(true)} className="btn-feedback correct">
                    <ThumbsUp size={18} /> Yes, it's correct
                  </button>
                  <button onClick={() => handleFeedback(false)} className="btn-feedback incorrect">
                    <ThumbsDown size={18} /> No, it's wrong
                  </button>
                </div>
              </div>
            )}
            
            <button onClick={handleReset} className="btn-new">
              Analyze Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadWaste;
