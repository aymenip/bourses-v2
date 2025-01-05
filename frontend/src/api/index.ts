import {
  TLogin,
  TLoginResponse,
  TAuthenticationContext,
  TUser,
  TForm,
} from "@/types";
import axios from "axios";
import { roleIdToRole } from "./utils";

const baseURL = "http://localhost:5000/";
const axiosInstance = axios.create({ baseURL });

export async function login(loginInput: TLogin) {
  const response = await axiosInstance.post<TLoginResponse>(
    "user/login",
    loginInput
  );
  response.data.token &&
    localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
}

export async function me() {
  const token = authenticationContext().token;
  if (!token) {
    throw new Error();
  }
  const response = await axiosInstance.get<TUser>("user/me", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}

export function clearSotrage() {
  localStorage.removeItem("user");
}

export function authenticationContext(): TAuthenticationContext {
  if (localStorage.getItem("user") === null)
    return { isAuthenticated: false, role: null, token: null };
  const user: TLoginResponse = JSON.parse(localStorage.getItem("user")!);
  return {
    isAuthenticated: user.token !== null,
    role: roleIdToRole(user.roleId),
    token: user.token,
  };
}

export async function forms(): Promise<TForm[]> {
  const token = authenticationContext().token;
  if (!token) {
    throw new Error();
  }
  const response = await axiosInstance.get<TForm[]>("form/all", {
    headers: {
      Authorization: token,
    },
  });
  return response.data || [];
}

export async function form(id: number): Promise<TForm> {
  const token = authenticationContext().token;
  if (!token) {
    throw new Error();
  }
  const response = await axiosInstance.get<TForm>("form", {
    headers: {
      Authorization: token,
    },
    params: {
      id: id,
    },
  });
  return response.data;
}

export async function deleteForm(id: number): Promise<void> {
  const token = authenticationContext().token;
  if (!token) {
    throw new Error();
  }
  const response = await axiosInstance.delete<void>(`form/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}
