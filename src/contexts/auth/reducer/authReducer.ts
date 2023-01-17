import { AuthActions, AuthActionsType, AuthState } from "../auth.types";

export const authInitialState: AuthState = {
    loading: false,
    messageError: '',
    user: null
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
                user: action.payload
            }
        case AuthActions.logout:
            return {
                ...authInitialState
            }
        case AuthActions.loginError:
            return {
                messageError: action.payload,
                loading: false,
                user: null
            }

        default:
            throw new Error('Unhandled action type');
    }
}



