import { useMutation } from "@tanstack/react-query";
import { createConference, deleteConference } from "./services";
import { TCreateConference } from "@/types/conferences";

export function useCreateConference() {
    return useMutation({
        mutationKey: ["createConference"],
        mutationFn: async (conference: TCreateConference) => await createConference(conference)
    })
}

export function useDeleteConference() {
    return useMutation({
        mutationKey: ["deleteConference"],
        mutationFn: async (id: number) => await deleteConference(id)
    })
}