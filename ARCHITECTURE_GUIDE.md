# ReVive Waste System - Architecture Guide

## System Overview

The ReVive Waste Monitoring System is a full-stack application demonstrating AI-powered waste classification using a microservices architecture.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Dashboard   │  │ Upload Waste │  │   Navbar     │          │
│  │  Component   │  │  Component   │  │  Component   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │         API Service (axios)                       │          │
│  │  - uploadWaste()                                  │          │
│  │  - getStats()                                     │          │
│  │  - getHistory()                                   │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API Calls
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   NODE.JS BACKEND (Express)                      │
│                     http://localhost:5000                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │              Routes Layer                         │          │
│  │  POST /api/uploadWaste                           │          │
│  │  GET  /api/stats                                 │          │
│  │  GET  /api/history                               │          │
│  └──────────────────────────────────────────────────┘          │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────┐          │
│  │          Controllers Layer                       │          │
│  │  - wasteController.uploadWaste()                │          │
│  │  - wasteController.getStats()                   │          │
│  │  - wasteController.getHistory()                 │          │
│  └──────────────────────────────────────────────────┘          │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────┐          │
│  │           Middleware Layer                       │          │
│  │  - Multer (Image Upload)                        │          │
│  │  - CORS                                         │          │
│  │  - Body Parser                                  │          │
│  └──────────────────────────────────────────────────┘          │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────┐          │
│  │            Models Layer                          │          │
│  │  - WasteLog (Mongoose Schema)                   │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────┬───────────────────────────┬────────────────────────┘
              │                           │
              │ HTTP Request              │ MongoDB Queries
              ▼                           ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   PYTHON AI SERVICE      │   │      MONGODB DATABASE    │
│   http://localhost:5001  │   │   mongodb://localhost    │
│                          │   │                          │
│  ┌────────────────────┐ │   │  ┌────────────────────┐ │
│  │   Flask API        │ │   │  │  waste_logs        │ │
│  │   POST /predict    │ │   │  │  Collection        │ │
│  └────────────────────┘ │   │  │                    │ │
│           │              │   │  │  - imageUrl        │ │
│  ┌────────▼──────────┐  │   │  │  - category        │ │
│  │  Waste Classifier │  │   │  │  - confidence      │ │
│  │  (AI Model)       │  │   │  │  - createdAt       │ │
│  │  - predict()      │  │   │  └────────────────────┘ │
│  └───────────────────┘  │   └──────────────────────────┘
└──────────────────────────┘
```

## Data Flow

### Upload Waste Image Flow

```
1. User selects image in React UI
   ↓
2. Frontend sends FormData to Backend
   POST /api/uploadWaste
   ↓
3. Multer middleware saves image to /uploads
   ↓
4. Controller converts image to base64
   ↓
5. Backend sends to Python AI Service
   POST http://localhost:5001/predict
   ↓
6. AI Service processes image
   Returns: { category: "Plastic", confidence: 0.92 }
   ↓
7. Backend saves result to MongoDB
   WasteLog.create({ imageUrl, category, confidence })
   ↓
8. Backend returns result to Frontend
   ↓
9. Frontend displays result to user
```

### Dashboard Statistics Flow

```
1. User opens Dashboard
   ↓
2. Frontend requests stats
   GET /api/stats
   ↓
3. Backend queries MongoDB
   - Count today's predictions
   - Aggregate category stats
   - Get latest prediction
   ↓
4. Backend returns aggregated data
   ↓
5. Frontend renders:
   - Stats cards
   - Pie chart
   - Recent history
```

## Technology Stack Details

### Frontend (React)

**Core Libraries:**
- React 18.2.0 (Functional Components + Hooks)
- React Router 6.15.0 (Navigation)
- Axios 1.5.0 (HTTP Client)
- Recharts 2.8.0 (Data Visualization)

**Key Patterns:**
- Functional components with hooks
- useState for local state
- useEffect for side effects
- Custom API service layer
- CSS modules for styling

**Components:**
```
App.jsx (Root)
├── Navbar.jsx (Navigation)
├── Dashboard.jsx (Main view)
│   ├── StatsCard.jsx (Reusable card)
│   └── WasteChart.jsx (Pie chart)
└── UploadWaste.jsx (Upload interface)
```

### Backend (Node.js + Express)

**Core Libraries:**
- Express 4.18.2 (Web Framework)
- Mongoose 7.5.0 (MongoDB ODM)
- Multer 1.4.5 (File Upload)
- Axios 1.5.0 (HTTP Client)
- CORS 2.8.5 (Cross-Origin)

**Architecture Pattern:** MVC (Model-View-Controller)

**Folder Structure:**
```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── WasteLog.js        # Data schema
├── controllers/
│   └── wasteController.js # Business logic
├── routes/
│   └── wasteRoutes.js     # API endpoints
├── middleware/
│   └── upload.js          # Multer config
└── server.js              # Entry point
```

### AI Service (Python + Flask)

**Core Libraries:**
- Flask 2.3.3 (Web Framework)
- Flask-CORS 4.0.0 (Cross-Origin)
- Pillow 10.0.0 (Image Processing)
- NumPy 1.24.3 (Numerical Computing)

**Current Implementation:**
- Mock predictions for prototype
- Random category selection
- Simulated confidence scores

**Production Implementation (Future):**
```python
# Would use:
- TensorFlow/PyTorch for CNN model
- Pre-trained model (ResNet, MobileNet)
- Image preprocessing pipeline
- Model inference
```

### Database (MongoDB)

**Schema Design:**

```javascript
WasteLog {
  _id: ObjectId,           // Auto-generated
  imageUrl: String,        // "/uploads/waste-123456.jpg"
  category: String,        // "Organic" | "Plastic" | "Metal"
  confidence: Number,      // 0.0 to 1.0
  createdAt: Date         // Auto-timestamp
}
```

**Indexes:**
- createdAt (for time-based queries)
- category (for aggregation)

## API Specification

### Backend REST API

#### 1. Upload Waste Image

```http
POST /api/uploadWaste
Content-Type: multipart/form-data

Body:
  image: <file>

Response: 201 Created
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "imageUrl": "/uploads/waste-1234567890.jpg",
    "category": "Plastic",
    "confidence": 0.92,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2. Get Statistics

```http
GET /api/stats

Response: 200 OK
{
  "success": true,
  "data": {
    "todayCount": 15,
    "totalPredictions": 247,
    "categoryStats": [
      { "_id": "Organic", "count": 89 },
      { "_id": "Plastic", "count": 102 },
      { "_id": "Metal", "count": 56 }
    ],
    "latestPrediction": {
      "_id": "65abc123...",
      "category": "Plastic",
      "confidence": 0.92,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "aiStatus": "Active"
  }
}
```

#### 3. Get History

```http
GET /api/history?page=1&limit=20

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "_id": "65abc123...",
      "imageUrl": "/uploads/waste-1234567890.jpg",
      "category": "Plastic",
      "confidence": 0.92,
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    // ... more items
  ],
  "pagination": {
    "total": 247,
    "page": 1,
    "pages": 13
  }
}
```

### AI Service API

#### Predict Waste Category

```http
POST /predict
Content-Type: application/json

Body:
{
  "image": "<base64-encoded-image>"
}

Response: 200 OK
{
  "category": "Plastic",
  "confidence": 0.92
}
```

## Security Considerations

### Current Implementation (Prototype)
- No authentication
- No authorization
- Local file storage
- No input sanitization
- No rate limiting

### Production Recommendations
- Add JWT authentication
- Implement role-based access
- Use cloud storage (AWS S3, Azure Blob)
- Validate and sanitize inputs
- Add rate limiting
- Enable HTTPS
- Implement CSRF protection
- Add request logging

## Performance Considerations

### Current Limitations
- Synchronous image processing
- No caching
- No CDN for images
- Single-threaded AI service

### Optimization Strategies
- Implement Redis caching
- Use CDN for static assets
- Add image compression
- Implement queue system (Bull, RabbitMQ)
- Scale AI service horizontally
- Add database indexing
- Implement pagination

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────┐
│              Load Balancer (Nginx)              │
└────────────┬────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼────┐
│ Node.js│      │ Node.js │
│Instance│      │Instance │
└───┬────┘      └────┬────┘
    │                │
    └────────┬───────┘
             │
    ┌────────▼────────┐
    │  MongoDB Cluster│
    └─────────────────┘

    ┌─────────────────┐
    │  Python AI Pool │
    │  (Multiple)     │
    └─────────────────┘

    ┌─────────────────┐
    │  Cloud Storage  │
    │  (S3/Azure)     │
    └─────────────────┘
```

## Testing Strategy

### Unit Tests
- Backend controllers
- API routes
- Database models
- AI prediction logic

### Integration Tests
- API endpoint flows
- Database operations
- AI service communication

### E2E Tests
- User upload flow
- Dashboard rendering
- Data persistence

## Monitoring & Logging

### Recommended Tools
- Application: Winston/Morgan
- Performance: New Relic/DataDog
- Errors: Sentry
- Analytics: Google Analytics

---

This architecture provides a solid foundation for a university prototype while being extensible for production deployment.
