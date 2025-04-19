import { TCreateThesis, TThesis, TUpdateThesis } from "@/types/thesis";
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
export async function thesis(id: number): Promise<TThesis> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TThesis>(`thesis/${id}`, {
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
export async function updateThesis(thesis: TUpdateThesis): Promise<TThesis> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.put<TThesis>("/thesis/update", thesis, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function deleteThesis(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    await axiosInstance.delete(`/thesis/${id}`, {
        headers: {
            Authorization: token,
        },
    });
}