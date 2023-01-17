import { ReactNode, useReducer } from 'react';
import { globalSnackbarInitialState, globalSnackbarReducer } from './../reducer/globalSnackbar.reducer';
import { GlobalSnackbarContext, GlobalSnackbarDispatch } from '../globalSnackbarContext';

export const GlobalSnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(globalSnackbarReducer, globalSnackbarInitialState)

    return (
        <GlobalSnackbarContext.Provider value={state}>
            <GlobalSnackbarDispatch.Provider value={dispatch}>
                {children}
            </GlobalSnackbarDispatch.Provider>
        </GlobalSnackbarContext.Provider>
    )
}