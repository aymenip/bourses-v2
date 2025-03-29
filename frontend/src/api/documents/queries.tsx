import { useQuery } from "@tanstack/react-query";
import { document } from "./services";

export function useDocument(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["form"],
        queryFn: () => document(id),
        enabled: options?.enabled
    })
}