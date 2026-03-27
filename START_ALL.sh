#!/bin/bash

echo "========================================"
echo "ReVive Waste Monitoring System"
echo "Starting All Services..."
echo "========================================"
echo ""

# Start Backend
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

sleep 3

# Start AI Service
echo "Starting AI Service..."
cd ai-service
python app.py &
AI_PID=$!
cd ..

sleep 3

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "All services are running!"
echo "========================================"
echo "Backend:    http://localhost:5000"
echo "AI Service: http://localhost:5001"
echo "Frontend:   http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for Ctrl+C
trap "kill $BACKEND_PID $AI_PID $FRONTEND_PID; exit" INT
wait
