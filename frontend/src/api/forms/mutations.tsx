import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm, createAFormBlock, createTypedField } from "./services";
import { TCreateForm } from "@/types";
import { TCreateFormBlock, TTypedField } from "@/types/forms";



export function useCreateForm() {
    return useMutation({
        mutationKey: ["createForm"],
        mutationFn: async (createForm: TCreateForm) => await createAForm(createForm)
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


export function useCreateTypedField() {
    return useMutation({
        mutationKey: ['createTypedField'],
        mutationFn: (typedField: TTypedField) => createTypedField(typedField)
    })
}