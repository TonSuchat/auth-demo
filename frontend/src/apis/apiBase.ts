import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

// request interceptor for api call
instance.interceptors.request.use(
  async (config) => {
    const token = "abcdefg";
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor for api call
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      // invoke api call for refresh token
      const token = "abcdefg";
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
