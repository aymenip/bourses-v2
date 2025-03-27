import { TLogin, TLoginResponse, TAuthenticationContext, TUser } from "@/types";
import { positionIdToPermission, roleIdToRole } from "../utils";
import { axiosInstance } from ".."

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
        return { isAuthenticated: false, role: null, token: null, position: null };
    const user: TLoginResponse = JSON.parse(localStorage.getItem("user")!);
    return {
        isAuthenticated: user.token !== null,
        role: roleIdToRole(user.roleId),
        position: positionIdToPermission(user.positionId),
        token: user.token,
    };
}

