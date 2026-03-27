# Quick Fix: "Failed to process waste image" Error

## The Problem

You're seeing: **⚠️ Failed to process waste image**

This means the backend cannot reach the AI service.

## The Solution (3 Steps)

### Step 1: Check if AI Service is Running

Open a new terminal and run:

```bash
curl http://localhost:5001/health
```

**If you get an error or "connection refused"**, the AI service is NOT running.

### Step 2: Start the AI Service

Open a **NEW terminal window** and run:

```bash
cd ai-service
python app.py
```

You should see:
```
🤖 AI Service starting on port 5001...
 * Running on http://127.0.0.1:5001
 * Running on http://[your-ip]:5001
```

**Keep this terminal open!** The AI service needs to stay running.

### Step 3: Try Uploading Again

1. Go back to http://localhost:3000/upload
2. Select an image
3. Click "Analyze Waste"
4. It should work now! ✅

## Still Not Working?

### Check All Services Are Running

You need **3 terminal windows** open:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Should show: "✅ MongoDB Connected Successfully"

**Terminal 2 - AI Service:**
```bash
cd ai-service
python app.py
```
Should show: "🤖 AI Service starting on port 5001..."

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```
Should open browser automatically

### Quick Service Check

Run this command to check all services:

**Windows:**
```bash
check_services.bat
```

**macOS/Linux:**
```bash
chmod +x check_services.sh
./check_services.sh
```

## Common Mistakes

❌ **Mistake 1:** Only starting backend and frontend (forgetting AI service)
✅ **Fix:** Start AI service in a separate terminal

❌ **Mistake 2:** Closing the AI service terminal
✅ **Fix:** Keep all 3 terminals open while using the app

❌ **Mistake 3:** Wrong port in .env file
✅ **Fix:** Check `backend/.env` has `AI_SERVICE_URL=http://localhost:5001/predict`

## Verify It's Working

After starting the AI service, test it:

```bash
curl http://localhost:5001/health
```

Should return:
```json
{"status":"OK","message":"AI Service is running"}
```

## The Complete Startup Sequence

Always start services in this order:

1. **MongoDB** (should already be running)
2. **Backend** (Terminal 1)
3. **AI Service** (Terminal 2) ← **Don't forget this!**
4. **Frontend** (Terminal 3)

## Use the Startup Script

Instead of starting manually, use:

**Windows:**
```bash
START_ALL.bat
```

**macOS/Linux:**
```bash
./START_ALL.sh
```

This starts all services automatically!

## What the Error Means

```
⚠️ Failed to process waste image
```

This error appears when:
- AI service is not running (most common)
- AI service crashed
- Wrong URL in backend/.env
- Port 5001 is blocked or in use

## Debug Steps

1. **Check backend terminal** - Look for error messages
2. **Check AI service terminal** - Should show incoming requests
3. **Check browser console** (F12) - Look for network errors

### Backend Terminal Should Show:

```
Sending request to AI service: http://localhost:5001/predict
AI service response: { category: 'Plastic', confidence: 0.92 }
```

### AI Service Terminal Should Show:

```
127.0.0.1 - - [date] "POST /predict HTTP/1.1" 200 -
```

## Need More Help?

See the complete troubleshooting guide:
- Read `TROUBLESHOOTING.md`
- Check `SETUP_GUIDE.md`

---

## TL;DR (Too Long; Didn't Read)

**The AI service is probably not running!**

**Fix:**
```bash
cd ai-service
python app.py
```

**Keep that terminal open and try uploading again!** ✅
