import { useMutation } from "@tanstack/react-query";
import { createCertificate, deleteCertificate, updateCertificate } from "./services";
import { TCreateCertificate, TUpdateCertificate } from "@/types/certificates";

export function useCreateCertificate() {
    return useMutation({
        mutationKey: ["createCertificate"],
        mutationFn: async (certificate: TCreateCertificate) => await createCertificate(certificate)
    })
}
export function useUpdateCertificate() {
    return useMutation({
        mutationKey: ['updateCertificate'],
        mutationFn: async (book: TUpdateCertificate) => await updateCertificate(book),
    });
}
export function useDeleteCertificate() {
    return useMutation({
        mutationKey: ["deleteCertificate"],
        mutationFn: async (id: number) => await deleteCertificate(id)
    })
}