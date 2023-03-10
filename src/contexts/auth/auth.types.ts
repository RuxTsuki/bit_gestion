export type AuthUser = {
    email?: string;
    password: string;
    username: string;
}

export enum AuthStateType {
    authenticated = 'authenticated',
    notAuthenticated = 'not_authenticated'
}

export type AuthState = {
    user: AuthUser | null;
    loading: boolean;
    messageError: string;
    state: AuthStateType;
}

export enum AuthActions {
    resetMsg = 'reset_msg',
    requestLogin = 'request_login',
    loginSuccess = 'login_success',
    logout = 'logout',
    loginError = 'login_error'
}

export type AuthActionsType =
    | { type: AuthActions.resetMsg }
    | { type: AuthActions.requestLogin }
    | { type: AuthActions.loginSuccess, payload: AuthUser }
    | { type: AuthActions.logout }
    | { type: AuthActions.loginError, payload: string }

