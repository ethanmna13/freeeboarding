import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  if (token && client && uid) {
    config.headers['access-token'] = token;
    config.headers['client'] = client;
    config.headers['uid'] = uid;
  }

  return config;
});

export default api;
