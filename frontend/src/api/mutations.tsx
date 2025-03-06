import { useMutation } from "@tanstack/react-query";
import { deleteForm, login, createForm} from ".";
import { TLogin, TCreateForm } from "@/types";

export function useAuth() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: TLogin) => login(data),
    });
}



// ========== forms

export function useCreateForm() {
    return useMutation({
        mutationKey: ["createForm"],
        mutationFn: (createForm: TCreateForm) => createForm(createForm)
    })
}

export function useDeleteForm() {
    return useMutation({
        mutationKey: ["deleteForm"],
        mutationFn: (id: number) => deleteForm(id)
    })
}
