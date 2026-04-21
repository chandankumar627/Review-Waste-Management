# ♻️ ReVive Waste Management System

A full-stack, AI-powered system designed to categorize waste, track environmental impact, and instruct users on proper waste disposal. 

## ✨ Key Features

- **🔒 Secure Authentication:** Fully integrated JWT-based Signup and Login system.
- **🧠 AI Image Processing:** Upload an image of waste and our Python microservice will classify it (Organic, Plastic, Metal, Unknown).
- **📊 Advanced Environmental Analytics:**
  - Tracks total **CO₂ emissions reduced**.
  - Estimates total **kg of landfill space saved**.
  - Calculates the amount of **interlocking paving tiles** that can be manufactured from recycled plastic.
- **📈 Global Dashboard:** See real-time system stats, daily upload trends, and recent global history.
- **⚙️ Admin Panel:** The first user to register automatically becomes an Admin, granting access to a global view of all history logs and user feedback markers.
- **🗺️ Nearby Recycling Map:** Integrated Google Map component to locate nearby disposal centers.
- **🔔 Live Notifications:** Integrated `react-toastify` for sleek contextual pop-up alerts.
- **💡 Smart Suggestion Engine:** Gives step-by-step instructions (Compost vs. Recycle vs. Hazardous).

---

## 🚀 How to Run the Project

This system is broken up into 3 main components: **Backend**, **Frontend**, and **AI Service**. You will need to run all 3 simultaneously in separate terminal windows.

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16+)
- [Python 3](https://www.python.org/)
- MongoDB (Running locally or via a cloud instance like MongoDB Atlas)

---

### 1. Run the Node.js Backend

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file inside the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/revive_waste
   JWT_SECRET=super_secret_jwt_key
   AI_SERVICE_URL=http://127.0.0.1:5001/predict
   ```
4. Start the server (runs on port 5000):
   ```bash
   npm start
   ```

---

### 2. Run the AI Python Service

1. Open a new, separate terminal and navigate to the AI service folder:
   ```bash
   cd ai-service
   ```
2. *(Optional but recommended)* Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask application (runs on port 5001):
   ```bash
   python app.py
   ```

---

### 3. Run the React Frontend

1. Open a 3rd new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file inside the `frontend` folder:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE  # Optional
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
5. Your browser should automatically open `http://localhost:3000`.

---

## 🛠️ Testing the Application

1. **Visit http://localhost:3000**.
2. **Register an Account:** Click "Sign Up". The *very first account* you create will automatically be granted **Admin privileges**.
3. **Upload Waste:** Head to the Upload section and submit an image of waste to see the AI engine trigger.
4. **Dashboard:** Go back to the dashboard to watch your environmental impact graphs update instantly!
