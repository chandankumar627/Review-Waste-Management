# ReVive Waste System - Quick Reference Card

## 🚀 Quick Start Commands

### Installation
```bash
# Backend
cd backend && npm install

# AI Service
cd ai-service && pip install -r requirements.txt

# Frontend
cd frontend && npm install
```

### Start Services
```bash
# Backend (Terminal 1)
cd backend && npm start

# AI Service (Terminal 2)
cd ai-service && python app.py

# Frontend (Terminal 3)
cd frontend && npm start
```

### Or use startup scripts
```bash
# Windows
START_ALL.bat

# macOS/Linux
chmod +x START_ALL.sh
./START_ALL.sh
```

## 🌐 Service URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| AI Service | http://localhost:5001 | 5001 |
| MongoDB | mongodb://localhost:27017 | 27017 |

## 📁 Project Structure

```
revive-waste-system/
├── backend/          # Node.js + Express API
├── frontend/         # React.js UI
├── ai-service/       # Python Flask AI
└── docs/            # Documentation
```

## 🔌 API Endpoints

### Backend (localhost:5000)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/uploadWaste` | Upload & classify image |
| GET | `/api/stats` | Get dashboard stats |
| GET | `/api/history` | Get prediction history |
| GET | `/health` | Health check |

### AI Service (localhost:5001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict` | Classify waste image |
| GET | `/health` | Health check |

## 📊 Database Schema

```javascript
WasteLog {
  imageUrl: String,      // Image path
  category: String,      // Organic/Plastic/Metal
  confidence: Number,    // 0.0 - 1.0
  createdAt: Date       // Timestamp
}
```

## 🎨 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main analytics view |
| `/upload` | UploadWaste | Image upload page |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Recharts |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| AI Service | Python, Flask |
| File Upload | Multer |

## 📦 Key Dependencies

### Backend (package.json)
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "multer": "^1.4.5-lts.1",
  "axios": "^1.5.0",
  "cors": "^2.8.5"
}
```

### Frontend (package.json)
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "axios": "^1.5.0",
  "recharts": "^2.8.0"
}
```

### AI Service (requirements.txt)
```
Flask==2.3.3
flask-cors==4.0.0
Pillow==10.0.0
numpy==1.24.3
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/revive_waste
AI_SERVICE_URL=http://localhost:5001/predict
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### AI Service (.env)
```
FLASK_ENV=development
PORT=5001
```

## 🐛 Common Issues

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find process using port (Windows)
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Find process (macOS/Linux)
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>
```

### Module Not Found
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install

# AI Service
cd ai-service && pip install -r requirements.txt
```

## 📝 Testing Flow

1. Start all services
2. Open http://localhost:3000
3. Click "Upload Waste"
4. Select an image
5. Click "Analyze Waste"
6. View prediction result
7. Check Dashboard for updated stats

## 🎯 Key Features

- ✅ AI-powered waste classification
- ✅ Real-time dashboard analytics
- ✅ Image upload with preview
- ✅ Confidence score display
- ✅ Category distribution chart
- ✅ Prediction history
- ✅ System status monitoring

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP_GUIDE.md` - Installation guide
- `ARCHITECTURE_GUIDE.md` - System architecture
- `QUICK_REFERENCE.md` - This file
- `PROJECT_STRUCTURE.txt` - File structure

## 🔮 Future Enhancements

- [ ] Train real CNN model
- [ ] Add user authentication
- [ ] Implement cloud storage
- [ ] Add export functionality
- [ ] Deploy to production
- [ ] Mobile app support

## 💡 Development Tips

- Use `npm run dev` with nodemon for hot-reload
- Check browser console for frontend errors
- Check terminal logs for backend errors
- MongoDB data persists between restarts
- Images stored in `backend/uploads/`

## 🎓 Learning Resources

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://www.mongodb.com/docs
- Flask: https://flask.palletsprojects.com

---

**Quick Help:** If stuck, check the detailed guides in README.md and SETUP_GUIDE.md
