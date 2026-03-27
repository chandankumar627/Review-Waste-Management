# Troubleshooting Guide - ReVive Waste System

## Common Issue: "Failed to process waste image"

This error typically occurs when the backend cannot communicate with the AI service. Follow these steps to diagnose and fix:

### Step 1: Check if AI Service is Running

**Open a terminal and check if the AI service is running on port 5001:**

```bash
# Windows
netstat -ano | findstr :5001

# macOS/Linux
lsof -i :5001
```

**If nothing is returned, the AI service is NOT running.**

### Step 2: Start the AI Service

**Open a new terminal and run:**

```bash
cd ai-service
python app.py
```

**You should see:**
```
🤖 AI Service starting on port 5001...
 * Running on http://0.0.0.0:5001
```

### Step 3: Verify AI Service is Working

**Test the AI service directly:**

```bash
# Windows PowerShell
Invoke-RestMethod -Uri http://localhost:5001/health -Method Get

# macOS/Linux or Git Bash
curl http://localhost:5001/health
```

**Expected response:**
```json
{"status":"OK","message":"AI Service is running"}
```

### Step 4: Check Backend Logs

**Look at your backend terminal for error messages:**

Common errors:
- `ECONNREFUSED` - AI service is not running
- `ETIMEDOUT` - AI service is not responding
- `Network Error` - Wrong URL or port

### Step 5: Verify Environment Variables

**Check `backend/.env` file:**

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/revive_waste
AI_SERVICE_URL=http://localhost:5001/predict
```

**Make sure `AI_SERVICE_URL` is correct!**

### Step 6: Check MongoDB Connection

**Look for this message in backend terminal:**
```
✅ MongoDB Connected Successfully
```

**If not connected:**

```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] MongoDB is running
- [ ] Backend is running on port 5000
- [ ] AI Service is running on port 5001
- [ ] Frontend is running on port 3000
- [ ] No port conflicts
- [ ] Environment variables are correct
- [ ] All dependencies are installed

## Testing Each Service Individually

### Test 1: Backend Health Check

```bash
# Should return: {"status":"OK","message":"ReVive Waste Backend is running"}
curl http://localhost:5000/health
```

### Test 2: AI Service Health Check

```bash
# Should return: {"status":"OK","message":"AI Service is running"}
curl http://localhost:5001/health
```

### Test 3: MongoDB Connection

```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Should see 'revive_waste' database
```

## Common Solutions

### Solution 1: Restart All Services

1. Stop all services (Ctrl+C in each terminal)
2. Start MongoDB
3. Start Backend
4. Start AI Service
5. Start Frontend

### Solution 2: Check Python Dependencies

```bash
cd ai-service
pip install -r requirements.txt
```

### Solution 3: Check Node Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Solution 4: Clear and Reinstall

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

## Detailed Error Messages

### Error: "ECONNREFUSED"

**Cause:** AI service is not running

**Solution:**
```bash
cd ai-service
python app.py
```

### Error: "ETIMEDOUT"

**Cause:** AI service is not responding

**Solution:**
1. Check if AI service is running
2. Check firewall settings
3. Verify port 5001 is not blocked

### Error: "Network Error"

**Cause:** Wrong URL or network issue

**Solution:**
1. Check `AI_SERVICE_URL` in `backend/.env`
2. Should be: `http://localhost:5001/predict`
3. Restart backend after changing .env

### Error: "MongoDB Connection Failed"

**Cause:** MongoDB is not running

**Solution:**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

## Step-by-Step Upload Test

1. **Start all services in order:**
   ```bash
   # Terminal 1
   cd backend && npm start
   
   # Terminal 2
   cd ai-service && python app.py
   
   # Terminal 3
   cd frontend && npm start
   ```

2. **Verify each service:**
   - Backend: http://localhost:5000/health
   - AI Service: http://localhost:5001/health
   - Frontend: http://localhost:3000

3. **Test upload:**
   - Go to http://localhost:3000/upload
   - Select an image
   - Click "Analyze Waste"
   - Check backend terminal for logs

4. **Check logs:**
   - Backend should show: "Sending request to AI service..."
   - AI Service should show: POST request received
   - Backend should show: "AI service response: {...}"

## Advanced Debugging

### Enable Detailed Logging

**Backend (server.js):**
Add this before routes:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**AI Service (app.py):**
Already has Flask debug mode enabled

### Check Network Requests

**In browser:**
1. Open DevTools (F12)
2. Go to Network tab
3. Try uploading an image
4. Look for failed requests (red)
5. Click on failed request to see details

### Test AI Service Directly

**Create a test file `test_ai.py`:**
```python
import requests
import base64

# Read a test image
with open('test_image.jpg', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode('utf-8')

# Send to AI service
response = requests.post(
    'http://localhost:5001/predict',
    json={'image': image_data}
)

print(response.json())
```

## Port Conflicts

### Check What's Using Ports

**Windows:**
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5001
netstat -ano | findstr :3000
```

**macOS/Linux:**
```bash
lsof -i :5000
lsof -i :5001
lsof -i :3000
```

### Kill Process Using Port

**Windows:**
```bash
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
kill -9 <PID>
```

## Still Not Working?

### Complete Reset

1. **Stop all services**
2. **Clear everything:**
   ```bash
   # Remove node_modules
   cd backend && rm -rf node_modules package-lock.json
   cd ../frontend && rm -rf node_modules package-lock.json
   
   # Reinstall
   cd backend && npm install
   cd ../frontend && npm install
   cd ../ai-service && pip install -r requirements.txt
   ```

3. **Restart MongoDB:**
   ```bash
   # Windows
   net stop MongoDB
   net start MongoDB
   ```

4. **Start services in order:**
   - MongoDB
   - Backend
   - AI Service
   - Frontend

5. **Test again**

## Getting Help

If you're still having issues:

1. **Check backend terminal** - Look for error messages
2. **Check AI service terminal** - Look for request logs
3. **Check browser console** - Look for network errors
4. **Verify all services are running** - Use health check endpoints

### Collect This Information:

- [ ] Backend terminal output
- [ ] AI service terminal output
- [ ] Browser console errors
- [ ] Network tab errors
- [ ] Operating system
- [ ] Node.js version (`node --version`)
- [ ] Python version (`python --version`)
- [ ] MongoDB version (`mongod --version`)

---

**Most Common Fix:** Make sure the AI service is running! 90% of upload errors are because the AI service isn't started.

**Quick Test:**
```bash
curl http://localhost:5001/health
```

If this fails, start the AI service:
```bash
cd ai-service
python app.py
```
