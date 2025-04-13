import { useMutation } from "@tanstack/react-query";
import { createConference, deleteConference, updateConference } from "./services";
import { TCreateConference, TUpdateConference } from "@/types/conferences";

export function useCreateConference() {
    return useMutation({
        mutationKey: ["createConference"],
        mutationFn: async (conference: TCreateConference) => await createConference(conference)
    })
}
export function useUpdateConference() {
    return useMutation({
        mutationKey: ["updateConference"],
        mutationFn: async (conference: TUpdateConference) => await updateConference(conference)
    })
}

export function useDeleteConference() {
    return useMutation({
        mutationKey: ["deleteConference"],
        mutationFn: async (id: number) => await deleteConference(id)
    })
}