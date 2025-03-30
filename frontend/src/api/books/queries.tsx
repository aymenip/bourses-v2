import { useQuery } from "@tanstack/react-query";
import { books } from "./services";



export function useBooksForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["booksForUser"],
        queryFn: books,
        enabled: options?.enabled
    })
}
