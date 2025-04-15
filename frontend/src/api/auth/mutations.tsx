import { useMutation } from "@tanstack/react-query";
import { grantAccess, login } from "./services";
import { TLogin } from "@/types";


export function useAuth() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: TLogin) => login(data),
    });
}


export function useGrantAccess() {
    return useMutation({
        mutationKey: ["grantAccess"],
        mutationFn: (password: string) => grantAccess(password),
    })
}