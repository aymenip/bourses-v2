import { useQuery } from "@tanstack/react-query";
import { theses } from "./services";



export function useThesesForUser() {
    return useQuery({
        queryKey: ["thesesForUser"],
        queryFn: theses,
    })
}
