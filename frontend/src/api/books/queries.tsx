import { useQuery } from "@tanstack/react-query";
import { book, books } from "./services";



export function useBooksForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["booksForUser"],
        queryFn: books,
        enabled: options?.enabled
    })
}

export function useBook(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["book", id],
        queryFn: () => book(id),
        enabled: options?.enabled ?? true,
    })
}