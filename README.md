# ReVive Waste Monitoring System

An AI-powered waste monitoring dashboard that classifies waste images into categories (Organic, Plastic, Metal) using a full-stack architecture.

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────▶│   Node.js   │─────▶│   Python    │      │   MongoDB   │
│  Frontend   │      │   Backend   │      │ AI Service  │      │  Database   │
│             │◀─────│   (Express) │◀─────│   (Flask)   │      │             │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘
                            │                                           │
                            └───────────────────────────────────────────┘
```

## 🚀 Tech Stack

- **Frontend**: React.js (Hooks, React Router, Recharts)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **AI Service**: Python + Flask
- **Image Upload**: Multer

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (v5.0 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd revive-waste-system
```

### 2. Setup Backend (Node.js)

```bash
cd backend
npm install
```

Create `.env` file (already provided):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/revive_waste
AI_SERVICE_URL=http://localhost:5001/predict
```

### 3. Setup AI Service (Python)

```bash
cd ai-service
pip install -r requirements.txt
```

### 4. Setup Frontend (React)

```bash
cd frontend
npm install
```

Create `.env` file (already provided):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

## 🎯 Running the Application

⚠️ **IMPORTANT:** You need to run ALL THREE services simultaneously for the app to work!

### Terminal 1: Start Backend
```bash
cd backend
npm start
```
✅ Backend runs on: http://localhost:5000
Wait for: "✅ MongoDB Connected Successfully"

### Terminal 2: Start AI Service ⚠️ DON'T SKIP THIS!
```bash
cd ai-service
python app.py
```
✅ AI Service runs on: http://localhost:5001
Wait for: "🤖 AI Service starting on port 5001..."

**⚠️ If you skip this step, image uploads will fail with "Failed to process waste image" error!**

### Terminal 3: Start Frontend
```bash
cd frontend
npm start
```
✅ Frontend runs on: http://localhost:3000
Browser should open automatically

### Quick Troubleshooting

**Getting upload errors?** Check if AI service is running:
```bash
curl http://localhost:5001/health
```

If it fails, start the AI service (Terminal 2 above).

See `FIX_UPLOAD_ERROR.md` for detailed troubleshooting.

## 📱 Features

### 1. Dashboard Page
- Real-time statistics cards
- Waste category distribution chart
- Recent predictions history
- AI system status indicator

### 2. Upload Waste Page
- Image upload interface
- AI-powered classification
- Confidence score display
- Result visualization

## 🔌 API Endpoints

### Backend API (Port 5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/uploadWaste` | Upload waste image for classification |
| GET | `/api/stats` | Get dashboard statistics |
| GET | `/api/history` | Get prediction history |
| GET | `/health` | Health check |

### AI Service API (Port 5001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict` | Classify waste image |
| GET | `/health` | Health check |

## 📊 Database Schema

### WasteLog Collection

```javascript
{
  imageUrl: String,      // Path to uploaded image
  category: String,      // Organic, Plastic, Metal, Unknown
  confidence: Number,    // 0.0 to 1.0
  createdAt: Date       // Timestamp
}
```

## 🧪 Testing the System

1. Open http://localhost:3000
2. Navigate to "Upload Waste" page
3. Select an image file (JPG/PNG)
4. Click "Analyze Waste"
5. View the AI prediction result
6. Check the Dashboard for updated statistics

## 📝 Project Structure

```
revive-waste-system/
├── backend/
│   ├── config/db.js
│   ├── controllers/wasteController.js
│   ├── models/WasteLog.js
│   ├── routes/wasteRoutes.js
│   ├── middleware/upload.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Dashboard.jsx
│       │   ├── UploadWaste.jsx
│       │   ├── Navbar.jsx
│       │   ├── StatsCard.jsx
│       │   └── WasteChart.jsx
│       ├── services/api.js
│       └── styles/
└── ai-service/
    ├── model/waste_classifier.py
    └── app.py
```

## 🎓 Educational Notes

This is a university prototype demonstrating:
- Full-stack development
- RESTful API design
- Microservices architecture
- AI integration
- Modern React patterns
- MongoDB database operations

## ⚠️ Important Notes

- The AI service uses **mock predictions** for demonstration
- For production, replace with a trained ML model (TensorFlow/PyTorch)
- Images are stored locally in `backend/uploads/`
- No authentication implemented (add for production)

## 🔮 Future Enhancements

- Train actual CNN model for waste classification
- Add user authentication
- Implement real-time notifications
- Add export functionality for reports
- Deploy to cloud platform
- Add mobile app support

## 📄 License

This project is for educational purposes.

## 👥 Contributors

University Prototype Project

---

**ReVive Waste Monitoring System** - Making waste management smarter with AI 🌱♻️
