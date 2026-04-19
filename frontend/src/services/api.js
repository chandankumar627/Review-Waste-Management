import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for auth token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Upload waste image
export const uploadWaste = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post('/uploadWaste', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Get statistics
export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

// Get history
export const getHistory = async (page = 1, limit = 20) => {
  const response = await api.get(`/history?page=${page}&limit=${limit}`);
  return response.data;
};

// Submit feedback
export const submitFeedback = async (id, feedbackData) => {
  const response = await api.put(`/feedback/${id}`, feedbackData);
  return response.data;
};

export default api;
