import { useQuery } from "@tanstack/react-query";
import { clearSotrage, me } from ".";

export function useUser() {
    return useQuery({
        queryKey: ["me"],
        queryFn: me
    })
}


export function logout() {
    clearSotrage();
    window.location.href = '/login';
}