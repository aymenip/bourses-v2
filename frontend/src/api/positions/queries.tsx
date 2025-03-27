import { useQuery } from "@tanstack/react-query";
import { positions } from "./services";




export function usePositions(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ["positions"],
        queryFn: positions,
        enabled: options?.enabled ?? true,
    })
}
