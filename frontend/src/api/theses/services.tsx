import { TCreateThesis, TThesis } from "@/types/thesis";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";


export async function theses(): Promise<TThesis[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TThesis[]>("thesis/user", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

export async function createThesis(thesis: TCreateThesis): Promise<TThesis> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TThesis>("/thesis/create", thesis, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}