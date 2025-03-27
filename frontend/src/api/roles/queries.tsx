import { useQuery } from "@tanstack/react-query";
import { roles } from "./services";




export function useRoles() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: roles,
    })
}
