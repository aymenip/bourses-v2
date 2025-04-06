import { useQuery } from "@tanstack/react-query";
import { articles } from "./services";



export function useArticlesForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["articlesForUser"],
        queryFn: articles,
        enabled: options?.enabled
    })
}
