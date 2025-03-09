import { useQuery } from "@tanstack/react-query";
import { form, forms } from "./services";




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