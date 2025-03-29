import { TUploadDocument } from "@/types/document";
import { useMutation } from "@tanstack/react-query";
import { uploadDocument } from "./services";

export function useUploadDocument() {
    return useMutation({
        mutationKey: ["updloadDocument"],
        mutationFn: async (document: TUploadDocument) => await uploadDocument(document)
    })
}