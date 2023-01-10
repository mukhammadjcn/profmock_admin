import axios from "axios";

// Host URL
export let host = "https://prof-dist.edu.uz/api";

// Names for local usage
export const ROLE = "role";
export const ACCESS = "access";
export const REFRESH = "refresh";

// Get cookies
export const role = localStorage.getItem(ROLE);
export const token = localStorage.getItem(ACCESS);
export const refresh = localStorage.getItem(REFRESH);

// Set localstorage items
export const getLocal = (name) => localStorage.getItem(name);
export const removeLocal = (name) => localStorage.removeItem(name);
export const setLocal = (name, value) => localStorage.setItem(name, value);

export const isUser = () => token && role == "ROLE_USER";
export const isAdmin = () => token && role == "ROLE_EDUADMIN";
export const isManagment = () => token && role == "ROLE_MANAGEMENTADMIN";

// Requests header
export let headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json; charset=utf-8",
  Authorization: token ? `Bearer ${token}` : "",
};

// Axios instance
export let axiosInstance = axios.create({
  headers,
  baseURL: host,
  timeout: 100000,
});

export const HttpRequestHub = (config = null) => {
  return axiosInstance(config);
};
