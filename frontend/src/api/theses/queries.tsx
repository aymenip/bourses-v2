import { useQuery } from "@tanstack/react-query";
import { theses, thesis } from "./services";



export function useThesesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["thesesForUser"],
        queryFn: theses,
        enabled: options?.enabled ?? true,
    })
}

export function useThesis(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["book", id],
        queryFn: () => thesis(id),
        enabled: options?.enabled ?? true,
    })
}