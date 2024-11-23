import axios from "axios";

const token = localStorage.getItem('authToken');
const axiosInstance = axios.create({
    baseURL: "http://localhost:8010/proxy",
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage atau state
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
export default axiosInstance;

// console.log(import.meta.env.VITE_API_URL)
// console.log(import.meta.env.VITE_LAUNDRY_API_URL)
// "http://localhost:8888/api/v1"
// import.meta.env.VITE_API_URL
// baseURL: import.meta.env.VITE_LAUNDRY_API_URL,
// "http://localhost:8010/proxy/"