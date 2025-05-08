import axios, { AxiosInstance as Axios } from "axios";

export const BASE_URL = import.meta.env.VITE_URL;

const AxiosInstance: Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInstanceFormData: Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export { AxiosInstance, AxiosInstanceFormData };
