import axios from "axios";
import {
  checkIsAuthen,
  getJwtToken,
  clearUserData,
  setAuthen,
  getUserData,
} from "../auth";

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
  (error) => Promise.reject(error),
);

// response interceptor for api call
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // if token expires, silent refresh token
    if (
      isTokenExpired(error, originalRequest)
    ) {
      originalRequest._retry = true;
      // invoke api call for refresh token
      const token = await refreshToken();
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return instance(originalRequest);
    }
    // if unauthorize, clear localstorage
    if (isUnauthorized(error)) {
      clearUserData();
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  const response = await instance.post(
    "/token/refreshToken",
    { userId: getUserData()?.user.id },
  );
  if (response.status === 200) {
    setAuthen(response.data);
    return getJwtToken();
  } else return null;
};

const isTokenExpired = (error: any, originalRequest: any) => {
  return (
    error?.response?.status === 403 &&
    !originalRequest?._retry
  );
};

const isUnauthorized = (error: any) => {
  if (error?.response?.data?.message === "Access denied") return false;
  return (
    error?.response?.status === 401 || error?.response?.status === 403
  );
};
