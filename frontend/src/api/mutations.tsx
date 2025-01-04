import { useMutation } from "@tanstack/react-query";
import { login } from ".";
import { TLogin } from "@/types";

export function useAuth() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data: TLogin) => login(data),
    });
}