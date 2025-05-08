import axios, { AxiosInstance as Axios } from "axios";
import Cookies from "universal-cookie";

export const BASE_URL = import.meta.env.VITE_URL;
const cookies = new Cookies();

const AxiosInstance: Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    Authorization: cookies.get('trans-user-token') ? `Bearer ${cookies.get('trans-user-token')}` : "",
  },
});

const AxiosInstanceFormData: Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Authorization': cookies.get('trans-user-token') ? `Bearer ${cookies.get('trans-user-token')}` : "",
    'Content-Type': 'multipart/form-data'
  }
});

export { AxiosInstance, AxiosInstanceFormData };
