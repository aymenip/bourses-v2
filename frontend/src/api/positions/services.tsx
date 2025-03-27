import { TPosition } from "@/types/positions";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";

export async function positions(): Promise<TPosition[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TPosition[]>("position/all", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

