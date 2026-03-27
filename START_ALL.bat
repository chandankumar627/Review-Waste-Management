@echo off
echo ========================================
echo ReVive Waste Monitoring System
echo Starting All Services...
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul

echo Starting AI Service...
start cmd /k "cd ai-service && python app.py"
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo Backend:  http://localhost:5000
echo AI Service: http://localhost:5001
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
