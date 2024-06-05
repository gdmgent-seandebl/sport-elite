import axios from "axios";
import {
  getAuthToken,
  saveAuthToken,
  getAuthTokenExpiration,
  saveAuthTokenExpiration,
  getRefreshToken,
  saveRefreshToken,
} from "../storage";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/refresh`,
      {
        refreshToken: getRefreshToken(),
      }
    );
    const { token, refreshToken: newRefreshToken } = response.data;
    saveAuthToken(token);
    saveRefreshToken(newRefreshToken);
    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

const isTokenExpired = () => {
  const expiration = getAuthTokenExpiration();
  if (!expiration) return true;
  return Date.now() > expiration;
};

API.interceptors.request.use(async (config) => {
  let token = getAuthToken();
  let refreshtoken = getRefreshToken();
  if (isTokenExpired() && refreshtoken) {
    token = await refreshToken();
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { API };
