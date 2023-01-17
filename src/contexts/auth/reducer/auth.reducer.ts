import { AuthActions, AuthActionsType, AuthState, AuthStateType } from "../auth.types";

export const authInitialState: AuthState = {
    loading: false,
    messageError: '',
    user: null,
    state: AuthStateType.notAuthenticated
}

export const authReducer = (
    state: AuthState,
    action: AuthActionsType
) => {
    switch (action.type) {
        case AuthActions.requestLogin:
            return {
                ...authInitialState,
                loading: true
            }

        case AuthActions.resetMsg:
            return {
                ...authInitialState,
                loading: true
            }
        case AuthActions.loginSuccess:
            return {
                messageError: '',
                loading: false,
                user: action.payload,
                state: AuthStateType.authenticated
            }
        case AuthActions.logout:
            return {
                ...authInitialState
            }
        case AuthActions.loginError:
            return {
                messageError: action.payload,
                loading: false,
                user: null,
                state: AuthStateType.notAuthenticated
            }

        default:
            throw new Error('Unhandled action type');
    }
}



