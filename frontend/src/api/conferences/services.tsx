import { TConference, TCreateConference, TUpdateConference } from "@/types/conferences";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";


export async function conferences(): Promise<TConference[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TConference[]>("/conference/user", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}
export async function conference(id: number): Promise<TConference> {
    const token = authenticationContext().token;

    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TConference>(`/conference/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function updateConference(conference: TUpdateConference): Promise<TConference> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.put<TConference>("/conference/update", conference, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}
export async function createConference(conference: TCreateConference): Promise<TConference> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TConference>("/conference/create", conference, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function deleteConference(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    await axiosInstance.delete(`/conference/${id}`, {
        headers: {
            Authorization: token,
        },
    });
}