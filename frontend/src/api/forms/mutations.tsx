import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm, createAFormBlock, createField } from "./services";
import { TCreateForm } from "@/types";
import { TCreateFormBlock, TField } from "@/types/forms";



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


export function useCreateField() {
    return useMutation({
        mutationKey: ['createField'],
        mutationFn: (field: TField) => createField(field)
    })
}