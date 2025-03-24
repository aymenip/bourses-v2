import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm, createAFormBlock, createTypedField, createSourceableField } from "./services";
import { TCreateForm } from "@/types";
import { TCreateFormBlock, TSourceableField, TTypedField } from "@/types/forms";



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

export function useCreateSourceableField() {
    return useMutation({
        mutationKey: ['createSourceableField'],
        mutationFn: (sourceableField: TSourceableField) => createSourceableField(sourceableField)
    })
}