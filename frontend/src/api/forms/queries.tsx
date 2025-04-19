import { useQuery } from "@tanstack/react-query";
import { form, forms, getFormsForUser, getFullForm } from "./services";




export function useForms(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["forms"],
        queryFn: forms,
        enabled: options?.enabled ?? true,
    })
}

export function useForm(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["form", id],
        queryFn: () => form(id),
        enabled: options?.enabled ?? true,
    })
}
export function useFullForm(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["fullForm", id],
        queryFn: () => getFullForm(id),
        enabled: options?.enabled ?? true,
    })
}

export function useGetFormsForUser(positionId: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["getFormsForUser", positionId],
        queryFn: () => getFormsForUser(positionId),
        enabled: options?.enabled ?? true,
    })
}