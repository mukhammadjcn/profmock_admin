import axios from "axios";
import { getCookie } from "./Cookies";

// Host URL
export let host = "https://backoffice.Profmooc.edu.uz/api";

// Names for local usage
export const ROLE = "role";
export const ACCESS = "access";
export const REFRESH = "refresh";

// Get cookies
export const role = getCookie(ROLE);
export const token = getCookie(ACCESS);
export const refresh = getCookie(REFRESH);

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
