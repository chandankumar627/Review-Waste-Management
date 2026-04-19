import React, { useState } from 'react';
import { uploadWaste, submitFeedback } from '../services/api';
import { toast } from 'react-toastify';
import '../styles/UploadWaste.css';

const UploadWaste = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

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
        <h1>Upload Waste Image</h1>
        <p className="subtitle">Upload an image to classify waste type using AI</p>

        <div className="upload-area">
          {!preview ? (
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
              />
              <div className="upload-placeholder">
                <span className="upload-icon">📷</span>
                <p>Click to select an image</p>
                <p className="upload-hint">Supports: JPG, PNG (Max 5MB)</p>
              </div>
            </label>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <button onClick={handleReset} className="btn-reset">
                Choose Different Image
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {selectedFile && !result && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-upload"
          >
            {loading ? 'Analyzing...' : 'Analyze Waste'}
          </button>
        )}

        {result && (
          <div className="result-container">
            <h2>Analysis Result</h2>
            <div className="result-card">
              <div className={`result-category ${result.category.toLowerCase()}`}>
                <span className="category-icon">
                  {result.category === 'Organic' ? '🌱' : 
                   result.category === 'Plastic' ? '♻️' : '🔩'}
                </span>
                <h3>{result.category}</h3>
              </div>
              <div className="result-details">
                <p className="confidence-label">Confidence Level</p>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <p className="confidence-value">
                  {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>

              {result.disposalSuggestion && (
                <div className="suggestion-box">
                  <h4>💡 Smart Disposal Suggestion</h4>
                  <p><strong>Action:</strong> {result.disposalSuggestion.action}</p>
                  <p>{result.disposalSuggestion.explanation}</p>
                </div>
              )}

              {result.wasteFingerprint && (
                <div className="advanced-fingerprint">
                  <h4>🧾 Waste Fingerprint</h4>
                  <ul>
                    <li><strong>Condition:</strong> {result.wasteFingerprint.condition}</li>
                    <li><strong>Recyclable:</strong> {result.wasteFingerprint.recyclable ? 'Yes' : 'No'}</li>
                    <li><strong>Decomposition Time:</strong> {result.wasteFingerprint.decompositionTime}</li>
                  </ul>
                </div>
              )}

              {result.environmentalImpact && (
                <div className="environmental-impact">
                  <h4>🌱 Environmental Impact</h4>
                  <p>You saved <strong>{result.environmentalImpact.savedLandfillKg} kg</strong> of landfill volume</p>
                  <p><strong>{result.environmentalImpact.co2ReducedKg} kg</strong> of CO₂ emissions reduced</p>
                  {result.environmentalImpact.interlockingTiles > 0 && (
                    <p style={{marginTop: '10px', color: '#10b981', fontWeight: 'bold'}}>
                      🧱 Potential to manufacture <strong>{result.environmentalImpact.interlockingTiles} interlocking tiles</strong> from this plastic waste!
                    </p>
                  )}
                </div>
              )}

              <p className="result-timestamp">
                Analyzed at: {new Date(result.createdAt).toLocaleString()}
              </p>
            </div>
            
            {!feedbackGiven && (
              <div className="feedback-section" style={{marginTop: '15px', textAlign: 'center'}}>
                <p>Is this prediction correct?</p>
                <button onClick={() => handleFeedback(true)} style={{margin: '5px', padding: '5px 15px', cursor: 'pointer'}}>👍 Yes</button>
                <button onClick={() => handleFeedback(false)} style={{margin: '5px', padding: '5px 15px', cursor: 'pointer'}}>👎 No (Wrong prediction?)</button>
              </div>
            )}
            
            <button onClick={handleReset} className="btn-new" style={{marginTop: '20px'}}>
              Analyze Another Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadWaste;
