import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


export const sendNotification = (data) => API.post('/api/notifications', data);
export const getNotifications = (userId) => API.get(`/users/${userId}/notifications`);
