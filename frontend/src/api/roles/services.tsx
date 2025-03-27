import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";
import { TRole } from "@/types/roles";

export async function roles(): Promise<TRole[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TRole[]>("role/all", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

