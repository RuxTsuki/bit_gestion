import { AuthStateType } from "@/contexts/auth/auth.types";
import { useAuthState } from "@/contexts/auth/hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigateIfAuth = (goTo: string) => {
    const { state } = useAuthState();
    const navigateTo = useNavigate();

    useEffect(() => {
        console.log(state)
        if (state === AuthStateType.notAuthenticated) {
            navigateTo('/login');
            return;
        }

        navigateTo(goTo);
    }, [state]);
}

export const useRedirectIfNotAuth = () => {
    const { state } = useAuthState();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (state === AuthStateType.notAuthenticated) {
            navigateTo('/login');
        }
    }, []);
}