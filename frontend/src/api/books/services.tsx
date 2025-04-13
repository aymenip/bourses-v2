import { TUpdateBook } from "@/types/book";
import { axiosInstance } from ".."
import { authenticationContext } from "../auth/services";
import { TBook, TCreateBook } from "@/types";


export async function books(): Promise<TBook[]> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TBook[]>("/book/user", {
        headers: {
            Authorization: token,
        },
    });
    return response.data || [];
}

export async function book(id: number): Promise<TBook> {
    const token = authenticationContext().token;

    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.get<TBook>(`/book/${id}`, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function updateBook(book: TUpdateBook): Promise<TBook> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.put<TBook>("/book/update", book, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function createBook(book: TCreateBook): Promise<TBook> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    const response = await axiosInstance.post<TBook>("/book/create", book, {
        headers: {
            Authorization: token,
        },
    });
    return response.data || null;
}

export async function deleteBook(id: number): Promise<void> {
    const token = authenticationContext().token;
    if (!token) {
        throw new Error();
    }
    await axiosInstance.delete(`/book/${id}`, {
        headers: {
            Authorization: token,
        },
    });
}