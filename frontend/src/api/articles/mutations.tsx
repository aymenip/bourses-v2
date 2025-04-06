import { useMutation } from "@tanstack/react-query";
import { createArticle, deleteArticle } from "./services";
import { TCreateArticle } from "@/types/articles";

export function useCreateArticle() {
    return useMutation({
        mutationKey: ["createArticle"],
        mutationFn: async (article: TCreateArticle) => await createArticle(article)
    })
}

export function useDeleteArticle() {
    return useMutation({
        mutationKey: ["deleteArticle"],
        mutationFn: async (id: number) => await deleteArticle(id)
    })
}