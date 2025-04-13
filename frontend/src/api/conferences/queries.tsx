import { useQuery } from "@tanstack/react-query";
import { conference, conferences } from "./services";



export function useConferencesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["conferencesForUser"],
        queryFn: conferences,
        enabled: options?.enabled ?? true,
    })
}
export function useConference(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["conference", id],
        queryFn: () => conference(id),
        enabled: options?.enabled ?? true,
    })
}
