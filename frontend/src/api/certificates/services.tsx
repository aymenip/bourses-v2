import { TCertificate, TCreateCertificate, TUpdateCertificate } from "@/types/certificates";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";


export async function certificates(): Promise<TCertificate[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TCertificate[]>("/certificate/user", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

export async function certificate(id: number): Promise<TCertificate> {
    const token = authenticationContext().token;

    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TCertificate>(`/certificate/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function updateCertificate(book: TUpdateCertificate): Promise<TCertificate> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.put<TCertificate>("/certificate/update", book, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function createCertificate(certificate: TCreateCertificate): Promise<TCertificate> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TCertificate>("/certificate/create", certificate, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function deleteCertificate(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    await axiosInstance.delete(`/certificate/${id}`, {
        headers: {
            Authorization: token,
        },
    });
}