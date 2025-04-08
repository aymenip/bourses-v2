import { useQuery } from "@tanstack/react-query";
import { getSubmissionsForUser, submission, submissions } from "./services";




export function useSubmissions() {
    return useQuery({
        queryKey: ["submissions"],
        queryFn: submissions,
    })
}

export function useSubmission(id: number) {
    return useQuery({
        queryKey: ["submission"],
        queryFn: () => submission(id),
    })
}


export function useGetSubmissionsForUser(positionId: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["getSubmissionsForUser", positionId],
        queryFn: () => getSubmissionsForUser(positionId),
        enabled: options?.enabled
    })
}