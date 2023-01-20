import { ReactNode, useReducer } from 'react'
import { authInitialState, authReducer } from '../reducer'
import { AuthDispatchContext, AuthStateContext } from '../authContext'
import { useSetCredentials } from '../hooks/useSetCredentials'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}
