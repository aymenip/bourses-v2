import { TCreateBook } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createBook, deleteBook } from "./services";

export function useCreateBook() {
    return useMutation({
        mutationKey: ["createBook"],
        mutationFn: async (book: TCreateBook) => await createBook(book)
    })
}

export function useDeleteBook() {
    return useMutation({
        mutationKey: ["deleteBook"],
        mutationFn: async (id: number) => await deleteBook(id)
    })
}