import axios from "axios";
const API_BASE = __API_BASE__;
export const baseURL = API_BASE;
export const baseUploadsURL = API_BASE;
export const axiosInstance = axios.create({ API_BASE });
