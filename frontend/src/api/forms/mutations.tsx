import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm } from "./services";
import { TCreateForm } from "@/types";



export function useCreateForm() {
    return useMutation({
        mutationKey: ["createForm"],
        mutationFn: (createForm: TCreateForm) => createAForm(createForm)
    })
}

export function useDeleteForm() {
    return useMutation({
        mutationKey: ["deleteForm"],
        mutationFn: (id: number) => deleteForm(id)
    })
}