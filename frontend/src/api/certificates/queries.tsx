import { useQuery } from "@tanstack/react-query";
import { certificates } from "./services";



export function useCertificatesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["certificatesForUser"],
        queryFn: certificates,
        enabled: options?.enabled
    })
}
