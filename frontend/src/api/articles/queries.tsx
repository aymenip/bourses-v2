import { useQuery } from "@tanstack/react-query";
import { article, articles } from "./services";



export function useArticlesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["articlesForUser"],
        queryFn: articles,
        enabled: options?.enabled
    })
}

export function useArticle(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["article"],
        queryFn: () => article(id),
        enabled: options?.enabled
    })
}