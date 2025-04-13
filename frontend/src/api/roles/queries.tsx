import { useQuery } from "@tanstack/react-query";
import { roles } from "./services";




export function useRoles(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["roles"],
        queryFn: roles,
        enabled: options?.enabled ?? true,
    })
}
