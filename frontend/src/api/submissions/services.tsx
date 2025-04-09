import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";
import { TCreateSubmission, TSubmission, TUpdateSubmission } from "@/types/submissions";

export async function submissions(): Promise<TSubmission[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TSubmission[]>("submission/all", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

export async function submission(id: number): Promise<TSubmission> {

    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TSubmission>(`submission/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}

export async function createSubmission(createSubmission: TCreateSubmission): Promise<TSubmission> {

    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TSubmission>("submission/create", createSubmission, {
        headers: {
            Authorization: token,
        },
    })

    return response.data;
}
export async function updateSubmission(updatedSubmission: TUpdateSubmission): Promise<TSubmission> {

    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.put<TSubmission>("submission/update", updatedSubmission, {
        headers: {
            Authorization: token,
        },
    })

    return response.data;
}

export async function deleteSubmission(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.delete<void>(`submission/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data;
}



export async function getSubmissionsForUser(): Promise<TSubmission[]> {
    const token = authenticationContext().token;

    if (!token) {
        throw new Error();
    }

    const response = await axiosInstance.get<TSubmission[]>(`submission/user/`, {
        headers: {
            Authorization: token,
        },
    });

    return response.data || [];
}

