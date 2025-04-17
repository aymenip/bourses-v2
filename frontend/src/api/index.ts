import axios from "axios";
// export const baseURL = "http://localhost:5000";
export const baseURL = "https://bourse.cu-aflou.edu.dz/api";
export const axiosInstance = axios.create({ baseURL });
