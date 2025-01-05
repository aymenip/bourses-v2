import { useQuery } from "@tanstack/react-query";
import { clearSotrage, form, forms, me } from ".";

export function useUser() {
    return useQuery({
        queryKey: ["me"],
        queryFn: me
    })
}


export function logout() {
    clearSotrage();
    window.location.href = '/login';
}


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