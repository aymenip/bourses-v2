import { useMutation } from "@tanstack/react-query";
import { createArticle, deleteArticle, updateArticle } from "./services";
import { TCreateArticle, TUpdateArticle } from "@/types/articles";

export function useCreateArticle() {
    return useMutation({
        mutationKey: ["createArticle"],
        mutationFn: async (article: TCreateArticle) => await createArticle(article)
    })
}

export function useUpdateArticle() {
    return useMutation({
        mutationKey: ["updateArticle"],
        mutationFn: async (article: TUpdateArticle) => await updateArticle(article)
    })
}

export function useDeleteArticle() {
    return useMutation({
        mutationKey: ["deleteArticle"],
        mutationFn: async (id: number) => await deleteArticle(id)
    })
}