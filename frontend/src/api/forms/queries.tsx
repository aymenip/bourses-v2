import { useQuery } from "@tanstack/react-query";
import { form, forms, getFormsForUser, getFullForm } from "./services";




export function useForms() {
    return useQuery({
        queryKey: ["forms"],
        queryFn: forms,
    })
}

export function useForm(id: number) {
    return useQuery({
        queryKey: ["form"],
        queryFn: () => form(id),
    })
}
export function useFullForm(id: number) {
    return useQuery({
        queryKey: ["fullForm"],
        queryFn: () => getFullForm(id),
    })
}

export function useGetFormsForUser(positionId: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["getFormsForUser", positionId],
        queryFn: () => getFormsForUser(positionId),
        enabled: options?.enabled
    })
}