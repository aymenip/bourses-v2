import { TCreateThesis, TUpdateThesis } from "@/types/thesis";
import { useMutation } from "@tanstack/react-query";
import { createThesis, deleteThesis, updateThesis } from "./services";

export function useCreateThesis() {
    return useMutation({
        mutationKey: ["createThesis"],
        mutationFn: async (thesis: TCreateThesis) => await createThesis(thesis)
    })
}

export function useUpdateThesis() {
    return useMutation({
        mutationKey: ["updateThesis"],
        mutationFn: async (thesis: TUpdateThesis) => await updateThesis(thesis)
    })
}

export function useDeleteThesis() {
    return useMutation({
        mutationKey: ["deleteThesis"],
        mutationFn: async (id: number) => await deleteThesis(id)
    })
}