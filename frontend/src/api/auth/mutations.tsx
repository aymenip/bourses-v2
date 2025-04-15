import { useMutation } from "@tanstack/react-query";
import { grantAccess, login, userUpdate } from "./services";
import { TLogin } from "@/types";
import { TUpdateUser } from "@/types/user";


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

export function useUserUpdate(){
    return useMutation({
        mutationKey: ["userUpdate"],
        mutationFn: (updateUser: TUpdateUser) => userUpdate(updateUser),
    })
}