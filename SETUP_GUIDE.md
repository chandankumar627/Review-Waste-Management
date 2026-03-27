# Quick Setup Guide - ReVive Waste System

## Step-by-Step Installation

### Prerequisites Check

Before starting, verify you have:
- [ ] Node.js installed (check: `node --version`)
- [ ] Python installed (check: `python --version`)
- [ ] MongoDB installed and running

### Installation Steps

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

Expected packages:
- express
- mongoose
- cors
- dotenv
- multer
- axios

#### 2. Install Python Dependencies

```bash
cd ai-service
pip install -r requirements.txt
```

Expected packages:
- Flask
- flask-cors
- Pillow
- numpy

#### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Expected packages:
- react
- react-dom
- react-router-dom
- axios
- recharts

### Starting the Services

#### Option A: Manual Start (Recommended for Development)

Open 3 separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ Should see: "ReVive Waste Backend running on port 5000"

**Terminal 2 - AI Service:**
```bash
cd ai-service
python app.py
```
✅ Should see: "AI Service starting on port 5001..."

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```
✅ Should automatically open browser at http://localhost:3000

#### Option B: Using npm scripts (if configured)

```bash
# From root directory
npm run start:backend
npm run start:ai
npm run start:frontend
```

### Verification Checklist

After starting all services, verify:

1. **Backend Health Check**
   - Visit: http://localhost:5000/health
   - Should return: `{"status":"OK","message":"ReVive Waste Backend is running"}`

2. **AI Service Health Check**
   - Visit: http://localhost:5001/health
   - Should return: `{"status":"OK","message":"AI Service is running"}`

3. **Frontend**
   - Visit: http://localhost:3000
   - Should see the ReVive dashboard

4. **MongoDB Connection**
   - Check backend terminal for: "✅ MongoDB Connected Successfully"

### Common Issues & Solutions

#### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Issue: Port Already in Use

**Solution:**
Change ports in `.env` files:
- Backend: Change `PORT=5000` to another port
- AI Service: Change `PORT=5001` to another port
- Update `AI_SERVICE_URL` in backend `.env`
- Update `REACT_APP_API_URL` in frontend `.env`

#### Issue: Python Module Not Found

**Solution:**
```bash
cd ai-service
pip install --upgrade pip
pip install -r requirements.txt
```

#### Issue: React Build Errors

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Testing the Complete Flow

1. Open http://localhost:3000
2. Click "Upload Waste" in navigation
3. Select any image file (JPG/PNG)
4. Click "Analyze Waste"
5. Wait for AI prediction
6. View result with category and confidence
7. Go back to Dashboard
8. See updated statistics and recent prediction

### Development Tips

- Use `npm run dev` (with nodemon) for backend hot-reload
- React will auto-reload on file changes
- Check browser console for frontend errors
- Check terminal logs for backend/AI errors
- MongoDB data persists between restarts

### Stopping the Services

Press `Ctrl+C` in each terminal window to stop the services.

### Next Steps

- Explore the code structure
- Modify UI components in `frontend/src/components/`
- Add new API endpoints in `backend/routes/`
- Enhance AI logic in `ai-service/model/`
- Customize MongoDB schema in `backend/models/`

---

Need help? Check the main README.md for detailed documentation.
