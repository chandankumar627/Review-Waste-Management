#!/bin/bash

echo "========================================"
echo "ReVive Waste System - Service Checker"
echo "========================================"
echo ""

echo "Checking Backend (Port 5000)..."
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "[OK] Backend is running"
    curl -s http://localhost:5000/health
else
    echo "[ERROR] Backend is NOT running!"
    echo "Please start: cd backend && npm start"
fi
echo ""

echo "Checking AI Service (Port 5001)..."
if curl -s http://localhost:5001/health > /dev/null 2>&1; then
    echo "[OK] AI Service is running"
    curl -s http://localhost:5001/health
else
    echo "[ERROR] AI Service is NOT running!"
    echo "Please start: cd ai-service && python app.py"
fi
echo ""

echo "Checking Frontend (Port 3000)..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "[OK] Frontend is running"
else
    echo "[ERROR] Frontend is NOT running!"
    echo "Please start: cd frontend && npm start"
fi
echo ""

echo "Checking MongoDB..."
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo "[OK] MongoDB is running"
else
    echo "[ERROR] MongoDB is NOT running!"
    echo "Please start: sudo systemctl start mongod"
fi
echo ""

echo "========================================"
echo "Service Check Complete"
echo "========================================"
