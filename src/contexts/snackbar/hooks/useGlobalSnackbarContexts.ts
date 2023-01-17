import { useContext } from 'react';
import { GlobalSnackbarContext, GlobalSnackbarDispatch } from '../globalSnackbarContext';

export const useGetGlobalSnackbar = () => {
    const context = useContext(GlobalSnackbarContext);

    if (!context)
        throw new Error('useGetGlobalSnackbar must be used within a SnackbarProvider');

    return context;
};

export const useGetGlobalSnackbarDispatch = () => {
    const context = useContext(GlobalSnackbarDispatch);

    if (!context)
        throw new Error('useGetGlobalSnackbarDispatch must be used within a SnackbarProvider');

    return context;
};
