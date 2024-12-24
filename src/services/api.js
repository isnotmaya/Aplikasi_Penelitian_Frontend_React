import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3010',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
  withCredentials: false
});

// Tambahkan interceptors untuk debugging
api.interceptors.request.use(
  config => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('Response:', response.data);
    return response;
  },
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Server mungkin tidak berjalan atau CORS tidak diaktifkan');
    }
    console.error('Response Error:', {
      message: error.message,
      response: error.response,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export default api;
