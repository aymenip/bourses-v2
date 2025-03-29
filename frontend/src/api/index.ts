import axios from "axios";

export const baseURL = "http://localhost:5000/";
export const baseUploadsURL = "http://localhost:5000";
export const axiosInstance = axios.create({ baseURL });
