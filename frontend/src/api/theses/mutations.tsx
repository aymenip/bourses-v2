import { TCreateThesis } from "@/types/thesis";
import { useMutation } from "@tanstack/react-query";
import { createThesis, deleteThesis } from "./services";

export function useCreateThesis() {
    return useMutation({
        mutationKey: ["createThesis"],
        mutationFn: async (thesis: TCreateThesis) => await createThesis(thesis)
    })
}

export function useDeleteThesis() {
    return useMutation({
        mutationKey: ["deleteThesis"],
        mutationFn: async (id: number) => await deleteThesis(id)
    })
}