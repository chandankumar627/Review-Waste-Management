@echo off
echo ========================================
echo ReVive Waste System - Service Checker
echo ========================================
echo.

echo Checking Backend (Port 5000)...
curl -s http://localhost:5000/health
if %errorlevel% equ 0 (
    echo [OK] Backend is running
) else (
    echo [ERROR] Backend is NOT running!
    echo Please start: cd backend ^&^& npm start
)
echo.

echo Checking AI Service (Port 5001)...
curl -s http://localhost:5001/health
if %errorlevel% equ 0 (
    echo [OK] AI Service is running
) else (
    echo [ERROR] AI Service is NOT running!
    echo Please start: cd ai-service ^&^& python app.py
)
echo.

echo Checking Frontend (Port 3000)...
curl -s http://localhost:3000 > nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend is running
) else (
    echo [ERROR] Frontend is NOT running!
    echo Please start: cd frontend ^&^& npm start
)
echo.

echo Checking MongoDB...
mongosh --eval "db.version()" > nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB is running
) else (
    echo [ERROR] MongoDB is NOT running!
    echo Please start: net start MongoDB
)
echo.

echo ========================================
echo Service Check Complete
echo ========================================
pause
