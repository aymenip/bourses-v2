import axios from "axios";

export const baseURL = "https://bourse.cu-aflou.edu.dz/api";
export const baseUploadsURL = "https://bourse.cu-aflou.edu.dz/api";
export const axiosInstance = axios.create({ baseURL });
