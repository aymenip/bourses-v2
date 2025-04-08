import { useMutation } from "@tanstack/react-query";
import { createSubmission, deleteSubmission } from "./services";

import { TCreateSubmission } from "@/types/submissions";



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


