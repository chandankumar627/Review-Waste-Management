import React, { useState } from 'react';
import { uploadWaste } from '../services/api';
import '../styles/UploadWaste.css';

const UploadWaste = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
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
              <p className="result-timestamp">
                Analyzed at: {new Date(result.createdAt).toLocaleString()}
              </p>
            </div>
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
