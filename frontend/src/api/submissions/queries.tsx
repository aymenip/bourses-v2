import { useQuery } from "@tanstack/react-query";
import { getSubmissionsForUser, submission, submissions, submissionsForAForm } from "./services";




export function useSubmissions() {
    return useQuery({
        queryKey: ["submissions"],
        queryFn: submissions,
    })
}

export function useSubmissionsForAForm(id: number, options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["submissionsForAForm", id],
        queryFn: () => submissionsForAForm(id),
        enabled: options?.enabled ?? true,
    })
}


export function useSubmission(id: number) {
    return useQuery({
        queryKey: ["submission", id],
        queryFn: () => submission(id),
    })
}


export function useGetSubmissionsForUser(options?: { enabled: boolean }) {
    return useQuery({
        queryKey: ["getSubmissionsForUser"],
        queryFn: () => getSubmissionsForUser(),
        enabled: options?.enabled ?? true,
    })
}
