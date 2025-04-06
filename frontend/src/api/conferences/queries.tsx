import { useQuery } from "@tanstack/react-query";
import { conferences } from "./services";



export function useConferencesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["conferencesForUser"],
        queryFn: conferences,
        enabled: options?.enabled
    })
}
