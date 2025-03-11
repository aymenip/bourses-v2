import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm, createAFormBlock } from "./services";
import { TCreateForm } from "@/types";
import { TCreateFormBlock } from "@/types/forms";



export function useCreateForm() {
    return useMutation({
        mutationKey: ["createForm"],
        mutationFn: (createForm: TCreateForm) => createAForm(createForm)
    })
}

export function useCreateFormBlock() {
    return useMutation({
        mutationKey: ["createFormBlock"],
        mutationFn: (createFormBlock: TCreateFormBlock) => createAFormBlock(createFormBlock)
    })
}

export function useDeleteForm() {
    return useMutation({
        mutationKey: ["deleteForm"],
        mutationFn: (id: number) => deleteForm(id)
    })
}