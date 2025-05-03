import axios from 'axios';

// for client-side fetching
export const axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
            'Content-Type': 'application/json',
      },
      method: 'get',
});

axiosClient.interceptors.request.use(
      async (config) => {
            if (typeof window !== 'undefined') {
            }

            return config;
      },
      (err) => {
            return Promise.reject(err);
      }
);

// Response Error Handler
axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
            console.log('error', error);
      }
);

// for server-side fetching
export const axiosServer = axios.create({
      baseURL: process.env.API_URL,
      headers: {
            'Content-Type': 'application/json',
      },
      method: 'get',
});

axiosServer.interceptors.response.use(
      (response) => response,
      async (error) => {
            if (error.response && error.response.status === 403) {
                  console.error('Access denied. Please login again.');
            }
            if (error.response) {
                  console.error('Error:', error.response.status, error.response.data);
            } else if (error.request) {
                  console.error('No response received', error.request);
            } else {
                  console.error('Error setting up request', error.message);
            }
            return Promise.reject(error);
      }
);
