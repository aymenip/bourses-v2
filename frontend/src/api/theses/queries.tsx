import { useQuery } from "@tanstack/react-query";
import { theses } from "./services";



export function useThesesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["thesesForUser"],
        queryFn: theses,
        enabled: options?.enabled ?? true,
    })
}
