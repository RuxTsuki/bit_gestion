import { useEffect, Dispatch } from 'react';
import { AuthActions, AuthActionsType, AuthUser } from '../auth.types';
import { PASSWORD_DEFAULT, USERNAME_DEFAULT } from '@/utils/userCredentials';
import { UserLocalStorage } from '@/utils/defaults';
import { useAuthDispatch } from './useAuthContext';

export const useSetCredentials = () => {
    const authDispatch = useAuthDispatch();

    useEffect(() => {
        const getUserLogged = async () => {
            const user = localStorage.getItem(UserLocalStorage);
            console.log(user);
            if (!user) return;


            let userObj: AuthUser | null = null;
            try {
                userObj = JSON.parse(user);
            } catch (error) {
                console.error('Failed to parse user')
            }

            if (userObj?.username === USERNAME_DEFAULT && userObj?.password === PASSWORD_DEFAULT)
                authDispatch({ type: AuthActions.loginSuccess, payload: userObj })
        }

        getUserLogged();
    }, [authDispatch]);
}
