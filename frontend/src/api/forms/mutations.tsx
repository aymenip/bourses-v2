import { useMutation } from "@tanstack/react-query";
import { createAForm, deleteForm, createAFormBlock, createTypedField, createSourceableField, changeFormAccess, deleteBlock, deleteField } from "./services";
import { TCreateForm } from "@/types";
import { TCreateFormBlock, TSourceableField, TTypedField } from "@/types/forms";
import { TCreateFormAccess } from "@/types/form-acess";



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

export function useDeleteBlock() {
    return useMutation({
        mutationKey: ["deleteBlock"],
        mutationFn: (id: number) => deleteBlock(id)
    })
}

export function useDeleteField(){
    return useMutation({
        mutationKey: ["deleteField"],
        mutationFn: ({ id, type }: { id: number; type: string }) => deleteField(id, type)
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


// formsAccess

export function useChangeFormAccess() {
    return useMutation({
        mutationKey: ["createFormAccess"],
        mutationFn: async (createFormAccess: TCreateFormAccess) => await changeFormAccess(createFormAccess)
    })
}