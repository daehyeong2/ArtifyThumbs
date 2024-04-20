import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      alert("권한 없음");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
