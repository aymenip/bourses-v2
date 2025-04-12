import { TArticle, TCreateArticle, TUpdateArticle } from "@/types/articles";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";


export async function articles(): Promise<TArticle[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TArticle[]>("/article/user", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}
export async function article(id: number): Promise<TArticle> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TArticle>(`/article/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function createArticle(article: TCreateArticle): Promise<TArticle> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TArticle>("/article/create", article, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}
export async function updateArticle(article: TUpdateArticle): Promise<TArticle> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    console.log('TUpdateArticle', article)
    const response = await axiosInstance.put<TArticle>("/article/update", article, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function deleteArticle(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    await axiosInstance.delete(`/article/${id}`, {
        headers: {
            Authorization: token,
        },
    });
}