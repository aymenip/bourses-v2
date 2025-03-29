import { TDocument, TUploadDocument } from "@/types/document";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";


export async function uploadDocument(document: TUploadDocument): Promise<TDocument> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const formData = new FormData();
    formData.append("file", document.file);
    formData.append("type", document.type);

    const response = await axiosInstance.post<TDocument>("document/upload", formData, {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data || [];
}


export async function document(id: number): Promise<TDocument> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TDocument>(`document/${id}`, {
        headers: {
            Authorization: token,
        },

    });
    return response.data;
}