import {} from 'react'


export const GlobalSnackbarProvider = () => {
  return (
    <>
    
    </>
  );
};alSnackbarContext';
import { globalSnackbarInitialState, globalSnackbarReducer } from './../reducer/globalSnackbar.reducer';

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