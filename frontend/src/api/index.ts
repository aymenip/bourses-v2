import { TLogin, TLoginResponse, TAuthenticationContext } from "@/types";
import axios from "axios";
import { roleIdToRole } from "./utils";

const baseURL = "http://localhost:5000/";
const axiosInstance = axios.create({ baseURL });

export async function login(loginInput: TLogin) {
  setTimeout(() => {}, 10000);
  const response = await axiosInstance.post<TLoginResponse>(
    "user/login",
    loginInput
  );
  response.data.token &&
    localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
}

export function authenticationContext(): TAuthenticationContext {
  if (localStorage.getItem("user") === null)
    return { isAuthenticated: false, role: null };
  const user: TLoginResponse = JSON.parse(localStorage.getItem("user")!);
  return {
    isAuthenticated: user.token !== null,
    role: roleIdToRole(user.roleId),
  };
}
