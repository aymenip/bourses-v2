import { TCreateBook } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./services";
import { TUpdateBook } from "@/types/book";

export function useCreateBook() {
    return useMutation({
        mutationKey: ["createBook"],
        mutationFn: async (book: TCreateBook) => await createBook(book)
    })
}

export function useUpdateBook() {
    return useMutation({
        mutationKey: ['updateBook'],
        mutationFn: async (book: TUpdateBook) => await updateBook(book),
    });
}

export function useDeleteBook() {
    return useMutation({
        mutationKey: ["deleteBook"],
        mutationFn: async (id: number) => await deleteBook(id)
    })
}