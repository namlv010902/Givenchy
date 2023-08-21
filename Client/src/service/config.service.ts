import axios from "axios"
import { animateScroll as scroll } from "react-scroll";

export const instance = axios.create({
  baseURL: "https://server-9izc.onrender.com/api/"
})

export const getAuthorizationHeaders = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
  const headers: Record<string, string> = {};  //Record<keyType, valueType>.
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return headers
}

export const scrollToTop = () => {
  scroll.scrollToTop();
}

instance.interceptors.request.use((config: any) => {
  const token = JSON.parse(localStorage.getItem("accessToken")!);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});