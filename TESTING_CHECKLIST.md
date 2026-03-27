# ReVive Waste System - Testing Checklist

## 🧪 Pre-Testing Setup

### Prerequisites
- [ ] Node.js installed and verified (`node --version`)
- [ ] Python installed and verified (`python --version`)
- [ ] MongoDB installed and running
- [ ] All dependencies installed (backend, frontend, ai-service)

### Environment Check
- [ ] Backend `.env` file exists with correct values
- [ ] Frontend `.env` file exists with correct values
- [ ] AI Service `.env` file exists with correct values
- [ ] MongoDB connection string is correct

## 🚀 Service Startup Tests

### Backend Service (Port 5000)
- [ ] Backend starts without errors
- [ ] Console shows "MongoDB Connected Successfully"
- [ ] Console shows "ReVive Waste Backend running on port 5000"
- [ ] Health check works: http://localhost:5000/health
- [ ] Returns: `{"status":"OK","message":"ReVive Waste Backend is running"}`

### AI Service (Port 5001)
- [ ] AI Service starts without errors
- [ ] Console shows "AI Service starting on port 5001..."
- [ ] Health check works: http://localhost:5001/health
- [ ] Returns: `{"status":"OK","message":"AI Service is running"}`

### Frontend Service (Port 3000)
- [ ] Frontend starts without errors
- [ ] Browser opens automatically to http://localhost:3000
- [ ] No console errors in browser DevTools
- [ ] Page loads and displays correctly

### MongoDB
- [ ] MongoDB service is running
- [ ] Database `revive_waste` is created
- [ ] Can connect using MongoDB Compass (optional)

## 🎨 Frontend UI Tests

### Navigation
- [ ] Navbar displays "ReVive Waste Monitoring System"
- [ ] "Dashboard" link is visible
- [ ] "Upload Waste" link is visible
- [ ] Clicking "Dashboard" navigates to home page
- [ ] Clicking "Upload Waste" navigates to upload page
- [ ] Active link is highlighted

### Dashboard Page
- [ ] Dashboard loads without errors
- [ ] Four stats cards are displayed:
  - [ ] Today's Predictions
  - [ ] Total Predictions
  - [ ] Latest Category
  - [ ] Latest Confidence
- [ ] AI Status indicator shows "Active" (green)
- [ ] Waste category distribution chart is visible
- [ ] Recent predictions section is visible
- [ ] If no data: Shows "No data available" message
- [ ] Page is responsive on mobile view

### Upload Waste Page
- [ ] Upload page loads without errors
- [ ] Title "Upload Waste Image" is displayed
- [ ] Upload area with camera icon is visible
- [ ] File input accepts clicks
- [ ] Subtitle explains functionality

## 📤 Upload Functionality Tests

### Image Selection
- [ ] Click upload area opens file picker
- [ ] Can select JPG image
- [ ] Can select PNG image
- [ ] Image preview displays after selection
- [ ] Preview image is properly sized
- [ ] "Choose Different Image" button appears
- [ ] Can change selected image

### File Validation
- [ ] Selecting non-image file shows error (if implemented)
- [ ] File over 5MB shows error (if implemented)
- [ ] Supported formats: JPG, JPEG, PNG

### Upload Process
- [ ] "Analyze Waste" button appears after image selection
- [ ] Button is enabled and clickable
- [ ] Clicking button shows "Analyzing..." text
- [ ] Button is disabled during upload
- [ ] No console errors during upload

### Result Display
- [ ] Result card appears after successful upload
- [ ] Category is displayed (Organic/Plastic/Metal)
- [ ] Category icon is shown (🌱/♻️/🔩)
- [ ] Confidence percentage is displayed
- [ ] Confidence bar is animated
- [ ] Confidence bar width matches percentage
- [ ] Timestamp is displayed
- [ ] "Analyze Another Image" button appears
- [ ] Clicking button resets the form

### Error Handling
- [ ] Network error shows error message
- [ ] Backend error shows error message
- [ ] AI service error shows error message
- [ ] Error message is user-friendly
- [ ] Can retry after error

## 📊 Dashboard Data Tests

### Initial State (No Data)
- [ ] Stats cards show 0 or "N/A"
- [ ] Chart shows "No data available" message
- [ ] History shows "No predictions yet"

### After First Upload
- [ ] Today's count increases to 1
- [ ] Total count increases to 1
- [ ] Latest category shows uploaded category
- [ ] Latest confidence shows uploaded confidence
- [ ] Chart updates with one category
- [ ] History shows one item with:
  - [ ] Thumbnail image
  - [ ] Category badge
  - [ ] Confidence percentage
  - [ ] Timestamp

### After Multiple Uploads
- [ ] Counts increase correctly
- [ ] Chart shows multiple categories
- [ ] Chart percentages are correct
- [ ] History shows multiple items
- [ ] Items are sorted by newest first
- [ ] Images display correctly

### Auto-Refresh
- [ ] Dashboard refreshes every 30 seconds
- [ ] New data appears without manual refresh
- [ ] No errors during auto-refresh

## 🔌 API Endpoint Tests

### POST /api/uploadWaste
- [ ] Accepts multipart/form-data
- [ ] Returns 201 status on success
- [ ] Returns prediction data
- [ ] Saves image to uploads folder
- [ ] Saves record to MongoDB
- [ ] Returns 400 if no image
- [ ] Returns 500 on server error

### GET /api/stats
- [ ] Returns 200 status
- [ ] Returns todayCount
- [ ] Returns totalPredictions
- [ ] Returns categoryStats array
- [ ] Returns latestPrediction
- [ ] Returns aiStatus
- [ ] Data is accurate

### GET /api/history
- [ ] Returns 200 status
- [ ] Returns array of predictions
- [ ] Returns pagination info
- [ ] Accepts page parameter
- [ ] Accepts limit parameter
- [ ] Items are sorted by date (newest first)
- [ ] Pagination works correctly

### GET /health
- [ ] Returns 200 status
- [ ] Returns status: "OK"
- [ ] Returns message

## 🤖 AI Service Tests

### POST /predict
- [ ] Accepts JSON with base64 image
- [ ] Returns 200 status
- [ ] Returns category (Organic/Plastic/Metal)
- [ ] Returns confidence (0.0 to 1.0)
- [ ] Returns 400 if no image data
- [ ] Returns 500 on error
- [ ] Response time is reasonable

### GET /health
- [ ] Returns 200 status
- [ ] Returns status: "OK"
- [ ] Returns message

## 🗄️ Database Tests

### MongoDB Connection
- [ ] Backend connects to MongoDB
- [ ] Database `revive_waste` exists
- [ ] Collection `wastelogs` is created

### Data Persistence
- [ ] Uploaded predictions are saved
- [ ] Data persists after server restart
- [ ] Timestamps are correct
- [ ] Image URLs are correct
- [ ] Categories are correct
- [ ] Confidence values are correct

### Queries
- [ ] Can query all records
- [ ] Can query by date
- [ ] Can aggregate by category
- [ ] Can sort by date
- [ ] Can paginate results

## 🎨 UI/UX Tests

### Visual Design
- [ ] Colors are consistent
- [ ] Fonts are readable
- [ ] Icons are appropriate
- [ ] Spacing is consistent
- [ ] Borders and shadows look good

### Responsiveness
- [ ] Works on desktop (1920x1080)
- [ ] Works on laptop (1366x768)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] No horizontal scrolling
- [ ] Text is readable on all sizes

### Animations
- [ ] Confidence bar animates smoothly
- [ ] Status dot pulses
- [ ] Hover effects work
- [ ] Transitions are smooth
- [ ] No janky animations

### Accessibility
- [ ] Images have alt text
- [ ] Buttons are clickable
- [ ] Links are distinguishable
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works (basic)

## 🔒 Security Tests (Basic)

### Input Validation
- [ ] File type is validated
- [ ] File size is limited
- [ ] No arbitrary file upload

### Error Messages
- [ ] Don't expose sensitive info
- [ ] Are user-friendly
- [ ] Don't show stack traces

### CORS
- [ ] CORS is enabled
- [ ] Frontend can access backend
- [ ] No CORS errors in console

## 🚀 Performance Tests

### Load Times
- [ ] Frontend loads in < 3 seconds
- [ ] Dashboard data loads in < 2 seconds
- [ ] Image upload completes in < 5 seconds
- [ ] AI prediction returns in < 3 seconds

### Resource Usage
- [ ] No memory leaks in browser
- [ ] CPU usage is reasonable
- [ ] Network requests are optimized
- [ ] Images are not too large

## 🐛 Error Scenarios

### Backend Down
- [ ] Frontend shows appropriate error
- [ ] User can retry
- [ ] No app crash

### AI Service Down
- [ ] Upload shows error message
- [ ] Dashboard still works
- [ ] Error is logged

### MongoDB Down
- [ ] Backend shows connection error
- [ ] Graceful error handling
- [ ] Error message in console

### Network Issues
- [ ] Timeout errors are handled
- [ ] User sees error message
- [ ] Can retry operation

## 📱 Browser Compatibility

### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Edge
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

### Safari (if available)
- [ ] All features work
- [ ] No console errors
- [ ] UI renders correctly

## 🎯 End-to-End Test Scenarios

### Scenario 1: First Time User
1. [ ] Open http://localhost:3000
2. [ ] See empty dashboard
3. [ ] Click "Upload Waste"
4. [ ] Select an image
5. [ ] Click "Analyze Waste"
6. [ ] See prediction result
7. [ ] Go back to Dashboard
8. [ ] See updated statistics

### Scenario 2: Multiple Uploads
1. [ ] Upload 3 different images
2. [ ] Each returns a prediction
3. [ ] Dashboard shows all 3
4. [ ] Chart shows distribution
5. [ ] History shows all items

### Scenario 3: Data Persistence
1. [ ] Upload an image
2. [ ] Stop all services
3. [ ] Restart all services
4. [ ] Check dashboard
5. [ ] Data is still there

### Scenario 4: Error Recovery
1. [ ] Stop AI service
2. [ ] Try to upload image
3. [ ] See error message
4. [ ] Start AI service
5. [ ] Retry upload
6. [ ] Upload succeeds

## ✅ Final Verification

### Documentation
- [ ] README.md is complete
- [ ] Setup guide is accurate
- [ ] All commands work as documented
- [ ] Screenshots match actual UI (if any)

### Code Quality
- [ ] No console.log statements (or minimal)
- [ ] No commented-out code
- [ ] Consistent formatting
- [ ] Meaningful variable names

### Deployment Ready
- [ ] .env files are not committed
- [ ] .gitignore is configured
- [ ] Dependencies are documented
- [ ] Startup scripts work

## 📊 Test Results Summary

| Category | Tests Passed | Tests Failed | Pass Rate |
|----------|--------------|--------------|-----------|
| Service Startup | __ / __ | __ | __% |
| Frontend UI | __ / __ | __ | __% |
| Upload Functionality | __ / __ | __ | __% |
| Dashboard Data | __ / __ | __ | __% |
| API Endpoints | __ / __ | __ | __% |
| AI Service | __ / __ | __ | __% |
| Database | __ / __ | __ | __% |
| UI/UX | __ / __ | __ | __% |
| Performance | __ / __ | __ | __% |
| Error Handling | __ / __ | __ | __% |
| **TOTAL** | **__ / __** | **__** | **__%** |

## 🎉 Sign-Off

- [ ] All critical tests passed
- [ ] All major features working
- [ ] Documentation is complete
- [ ] Ready for demonstration
- [ ] Ready for submission

**Tested By:** ___________________

**Date:** ___________________

**Overall Status:** ⬜ PASS  ⬜ FAIL  ⬜ NEEDS WORK

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

**Testing Complete!** 🎊

If all tests pass, your ReVive Waste System is ready for demonstration and deployment!
