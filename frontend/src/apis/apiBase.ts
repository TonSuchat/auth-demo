import axios from "axios";
import { checkIsAuthen, getJwtToken } from "../auth";

export const instance = axios.create();

// request interceptor for api call
instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf8",
    };
    if (checkIsAuthen()) {
      const token = getJwtToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor for api call
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !error &&
      !error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // invoke api call for refresh token
      const token = "abcdefg";
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
