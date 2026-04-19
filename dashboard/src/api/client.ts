import axios from 'axios';

const USER_SERVICE_URL = 'http://localhost:3001';
const API_SERVICE_URL = 'http://localhost:3002';

export const userApi = axios.create({
  baseURL: USER_SERVICE_URL,
});

export const apiService = axios.create({
  baseURL: API_SERVICE_URL,
});

// Add auth header to all requests
const addAuthToken = (config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const orgId = localStorage.getItem('selectedOrgId');
  if (orgId) {
    config.headers['X-Organization-Id'] = orgId;
  }
  
  return config;
};

userApi.interceptors.request.use(addAuthToken);
apiService.interceptors.request.use(addAuthToken);
