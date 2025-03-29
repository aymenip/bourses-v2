import { TCreateThesis } from "@/types/thesis";
import { useMutation } from "@tanstack/react-query";
import { createThesis } from "./services";

export function useCreateThesis() {
    return useMutation({
        mutationKey: ["createThesis"],
        mutationFn: async (thesis: TCreateThesis) => await createThesis(thesis)
    })
}