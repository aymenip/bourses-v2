import { useMutation } from "@tanstack/react-query";
import { createSubmission, deleteSubmission, updateSubmission } from "./services";

import { TCreateSubmission, TUpdateSubmission } from "@/types/submissions";



export function useCreateSubmission() {
    return useMutation({
        mutationKey: ["createSubmision"],
        mutationFn: async (createSubmision: TCreateSubmission) => await createSubmission(createSubmision)
    })
}



export function useDeleteSubmission() {
    return useMutation({
        mutationKey: ["deleteSubmission"],
        mutationFn: (id: number) => deleteSubmission(id)
    })
}

export function useUpdateSubmission() {
    return useMutation({
        mutationKey: ["updateSubmission"],
        mutationFn: (updatedSubmission: TUpdateSubmission) => updateSubmission(updatedSubmission)
    })
}





