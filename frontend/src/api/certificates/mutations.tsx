import { useMutation } from "@tanstack/react-query";
import { createCertificate, deleteCertificate } from "./services";
import { TCreateCertificate } from "@/types/certificates";

export function useCreateCertificate() {
    return useMutation({
        mutationKey: ["createCertificate"],
        mutationFn: async (certificate: TCreateCertificate) => await createCertificate(certificate)
    })
}

export function useDeleteCertificate() {
    return useMutation({
        mutationKey: ["deleteCertificate"],
        mutationFn: async (id: number) => await deleteCertificate(id)
    })
}