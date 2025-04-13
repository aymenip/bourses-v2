import { useQuery } from "@tanstack/react-query";
import { certificate, certificates } from "./services";



export function useCertificatesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["certificatesForUser"],
        queryFn: certificates,
        enabled: options?.enabled
    })
}

export function useCertificate(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["certificate", id],
        queryFn: () => certificate(id),
        enabled: options?.enabled ?? true,
    })
}
