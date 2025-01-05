import { useMutation } from "@tanstack/react-query";
import { deleteForm, login } from ".";
import { TLogin } from "@/types";

export function useAuth() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: TLogin) => login(data),
    });
}

export function useDeleteForm() {
    return useMutation({
        mutationKey: ["deleteForm"],
        mutationFn: (id: number) => deleteForm(id)
    })
}
