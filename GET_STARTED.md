# 🚀 Get Started with ReVive Waste System

Welcome! This guide will help you get the ReVive Waste Monitoring System up and running in minutes.

## 📋 Prerequisites

Before you begin, make sure you have these installed:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org
   - Verify: `node --version`

2. **Python** (v3.8 or higher)
   - Download: https://www.python.org
   - Verify: `python --version`

3. **MongoDB** (v5.0 or higher)
   - Download: https://www.mongodb.com/try/download/community
   - Verify: `mongod --version`

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 minutes)

Open your terminal and run these commands:

```bash
# Install Backend dependencies
cd backend
npm install
cd ..

# Install AI Service dependencies
cd ai-service
pip install -r requirements.txt
cd ..

# Install Frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Start MongoDB (30 seconds)

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 3: Start All Services (1 minute)

#### Option A: Use Startup Script (Easiest)

**Windows:**
```bash
START_ALL.bat
```

**macOS/Linux:**
```bash
chmod +x START_ALL.sh
./START_ALL.sh
```

#### Option B: Manual Start (More Control)

Open 3 separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Wait for: "✅ MongoDB Connected Successfully"

**Terminal 2 - AI Service:**
```bash
cd ai-service
python app.py
```
Wait for: "🤖 AI Service starting on port 5001..."

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```
Browser should open automatically at http://localhost:3000

### Step 4: Test the System (1 minute)

1. Your browser should open to http://localhost:3000
2. Click "Upload Waste" in the navigation
3. Select any image from your computer
4. Click "Analyze Waste"
5. See the AI prediction result!
6. Go back to Dashboard to see updated statistics

## ✅ Verification Checklist

After starting all services, verify:

- [ ] Backend running at http://localhost:5000
- [ ] AI Service running at http://localhost:5001
- [ ] Frontend running at http://localhost:3000
- [ ] MongoDB connected (check backend terminal)
- [ ] Can upload an image
- [ ] Can see prediction result
- [ ] Dashboard shows statistics

## 🎯 What You Can Do

### 1. Upload Waste Images
- Navigate to "Upload Waste"
- Select an image (JPG, PNG)
- Get AI classification result
- See confidence score

### 2. View Dashboard
- See today's prediction count
- View total predictions
- Check waste category distribution
- See recent prediction history
- Monitor AI system status

### 3. Explore the Code
- Backend: `backend/` folder
- Frontend: `frontend/src/` folder
- AI Service: `ai-service/` folder

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Complete project overview |
| `SETUP_GUIDE.md` | Detailed installation guide |
| `ARCHITECTURE_GUIDE.md` | System architecture details |
| `QUICK_REFERENCE.md` | Quick command reference |
| `FEATURES_CHECKLIST.md` | Feature list and roadmap |
| `GET_STARTED.md` | This file |

## 🐛 Troubleshooting

### Problem: MongoDB Connection Failed

**Solution:**
```bash
# Check if MongoDB is running
# Windows: services.msc (look for MongoDB)
# macOS/Linux: ps aux | grep mongod

# Start MongoDB
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Problem: Port Already in Use

**Solution:**
```bash
# Find what's using the port (Windows)
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Find what's using the port (macOS/Linux)
lsof -i :5000

# Kill the process (macOS/Linux)
kill -9 <PID>
```

### Problem: Module Not Found

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# AI Service
cd ai-service
pip install --upgrade pip
pip install -r requirements.txt
```

### Problem: Can't Upload Images

**Solution:**
1. Check if backend is running
2. Check if AI service is running
3. Check browser console for errors
4. Verify file is JPG or PNG
5. Verify file is under 5MB

## 🎓 Learning Path

### Beginner
1. Start all services and test the upload
2. Explore the Dashboard
3. Read the README.md
4. Look at the project structure

### Intermediate
1. Modify a React component (change colors, text)
2. Add a new API endpoint
3. Customize the database schema
4. Read ARCHITECTURE_GUIDE.md

### Advanced
1. Train a real AI model
2. Add user authentication
3. Deploy to cloud
4. Implement new features from FEATURES_CHECKLIST.md

## 💡 Tips

- **Development Mode**: Use `npm run dev` (with nodemon) for auto-reload
- **Check Logs**: Always check terminal logs for errors
- **Browser Console**: Open DevTools (F12) to see frontend errors
- **Database**: Use MongoDB Compass to view database visually
- **API Testing**: Use Postman to test API endpoints

## 🎨 Customization Ideas

### Easy
- Change colors in CSS files
- Modify text and labels
- Add new stats cards
- Change chart colors

### Medium
- Add new waste categories
- Create new dashboard widgets
- Add filtering options
- Implement search functionality

### Advanced
- Integrate real AI model
- Add user authentication
- Implement cloud storage
- Create mobile app

## 📞 Need Help?

1. Check the documentation files
2. Review the code comments
3. Check terminal logs for errors
4. Verify all services are running
5. Ensure MongoDB is connected

## 🎉 Success!

If you can:
- ✅ Upload an image
- ✅ See the prediction result
- ✅ View the dashboard
- ✅ See statistics updating

**Congratulations! Your ReVive Waste System is working perfectly!**

## 🚀 Next Steps

1. **Explore**: Try uploading different images
2. **Learn**: Read the architecture guide
3. **Customize**: Modify components to your liking
4. **Extend**: Add features from the checklist
5. **Deploy**: Consider deploying to production

## 📖 Recommended Reading Order

1. `GET_STARTED.md` (You are here!)
2. `README.md` - Project overview
3. `QUICK_REFERENCE.md` - Command reference
4. `ARCHITECTURE_GUIDE.md` - Deep dive
5. `FEATURES_CHECKLIST.md` - Future enhancements

---

**Happy Coding! 🎉**

Built with ❤️ for learning and innovation.
