# 🚀 Startup Checklist - ReVive Waste System

Print this or keep it open while starting the system!

## Before You Start

- [ ] MongoDB is installed and running
- [ ] Node.js is installed
- [ ] Python is installed
- [ ] All dependencies are installed

## Service Startup Order

### 1️⃣ Start Backend (Terminal 1)

```bash
cd backend
npm start
```

**Wait for these messages:**
- [ ] "✅ MongoDB Connected Successfully"
- [ ] "🚀 ReVive Waste Backend running on port 5000"

**If you see errors:**
- MongoDB not running? → `net start MongoDB` (Windows) or `brew services start mongodb-community` (Mac)
- Port in use? → Kill process on port 5000

---

### 2️⃣ Start AI Service (Terminal 2) ⚠️ CRITICAL!

```bash
cd ai-service
python app.py
```

**Wait for these messages:**
- [ ] "🤖 AI Service starting on port 5001..."
- [ ] "Running on http://127.0.0.1:5001"
- [ ] "Running on http://0.0.0.0:5001"

**If you see errors:**
- Module not found? → `pip install -r requirements.txt`
- Port in use? → Kill process on port 5001

**⚠️ KEEP THIS TERMINAL OPEN! If you close it, uploads will fail!**

---

### 3️⃣ Start Frontend (Terminal 3)

```bash
cd frontend
npm start
```

**Wait for:**
- [ ] "Compiled successfully!"
- [ ] Browser opens to http://localhost:3000

**If you see errors:**
- Module not found? → `npm install`
- Port in use? → Kill process on port 3000

---

## Verification Tests

### Test 1: Backend Health Check
```bash
curl http://localhost:5000/health
```
**Expected:** `{"status":"OK","message":"ReVive Waste Backend is running"}`
- [ ] Backend health check passed

### Test 2: AI Service Health Check ⚠️ IMPORTANT!
```bash
curl http://localhost:5001/health
```
**Expected:** `{"status":"OK","message":"AI Service is running"}`
- [ ] AI Service health check passed

### Test 3: Frontend Loads
- [ ] Browser opened to http://localhost:3000
- [ ] Dashboard page loads
- [ ] No errors in browser console (F12)

### Test 4: Upload Test
- [ ] Navigate to "Upload Waste" page
- [ ] Select an image file
- [ ] Click "Analyze Waste"
- [ ] See prediction result (not error!)
- [ ] Go to Dashboard
- [ ] See updated statistics

---

## Quick Service Check

Run this to check all services at once:

**Windows:**
```bash
check_services.bat
```

**macOS/Linux:**
```bash
./check_services.sh
```

---

## Terminal Window Layout

Keep your terminals organized:

```
┌─────────────────────┬─────────────────────┐
│   Terminal 1        │   Terminal 2        │
│   BACKEND           │   AI SERVICE ⚠️     │
│   Port 5000         │   Port 5001         │
│                     │   DON'T CLOSE!      │
├─────────────────────┴─────────────────────┤
│   Terminal 3                              │
│   FRONTEND                                │
│   Port 3000                               │
└───────────────────────────────────────────┘
```

---

## Common Startup Issues

### Issue: "Failed to process waste image"
**Cause:** AI Service (Terminal 2) is not running
**Fix:** Start AI service: `cd ai-service && python app.py`

### Issue: "MongoDB Connection Failed"
**Cause:** MongoDB is not running
**Fix:** 
- Windows: `net start MongoDB`
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

### Issue: "Port already in use"
**Cause:** Previous instance still running
**Fix:** Kill the process or restart computer

### Issue: "Module not found"
**Cause:** Dependencies not installed
**Fix:** 
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`
- AI Service: `cd ai-service && pip install -r requirements.txt`

---

## Success Indicators

You know everything is working when:

✅ All 3 terminals are open and running
✅ No error messages in any terminal
✅ Backend shows "MongoDB Connected"
✅ AI Service shows "Running on port 5001"
✅ Frontend shows "Compiled successfully"
✅ Browser opened to http://localhost:3000
✅ Dashboard loads without errors
✅ Can upload images successfully
✅ Predictions appear on dashboard

---

## Shutdown Procedure

When you're done:

1. Press `Ctrl+C` in Frontend terminal (Terminal 3)
2. Press `Ctrl+C` in AI Service terminal (Terminal 2)
3. Press `Ctrl+C` in Backend terminal (Terminal 1)

MongoDB can stay running.

---

## Quick Start Script

Instead of manual startup, use:

**Windows:**
```bash
START_ALL.bat
```

**macOS/Linux:**
```bash
chmod +x START_ALL.sh
./START_ALL.sh
```

This opens all 3 terminals automatically!

---

## Emergency Reset

If nothing works:

1. Stop all services (Ctrl+C)
2. Restart MongoDB
3. Clear and reinstall:
   ```bash
   cd backend && rm -rf node_modules && npm install
   cd ../frontend && rm -rf node_modules && npm install
   cd ../ai-service && pip install -r requirements.txt
   ```
4. Start services again in order (1, 2, 3)

---

## Need Help?

📖 Read these guides:
- `FIX_UPLOAD_ERROR.md` - Fix upload errors
- `TROUBLESHOOTING.md` - Complete troubleshooting
- `SETUP_GUIDE.md` - Detailed setup
- `GET_STARTED.md` - Quick start guide

---

## Checklist Summary

Before using the app, verify:

- [ ] MongoDB is running
- [ ] Terminal 1: Backend running (port 5000)
- [ ] Terminal 2: AI Service running (port 5001) ⚠️
- [ ] Terminal 3: Frontend running (port 3000)
- [ ] Backend health check passes
- [ ] AI Service health check passes ⚠️
- [ ] Frontend loads in browser
- [ ] Can upload images successfully

**If all checked, you're ready to go! 🎉**

---

**Remember:** The AI Service (Terminal 2) is the most commonly forgotten step!
