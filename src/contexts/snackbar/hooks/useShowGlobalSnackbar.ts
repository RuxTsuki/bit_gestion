import { useCallback } from 'react';
import { useGetGlobalSnackbarDispatch } from './useGlobalSnackbarContexts'
import { GlobalSnackbarActions, SnackbarTypes } from '../globalSnackbar.types';

export const useShowGlobalSnackbar = () => {
    const dispatch = useGetGlobalSnackbarDispatch();

    const openSnackbar = useCallback((
        message: string,
        type: SnackbarTypes = 'info',
        autoHideDuration: number = 5500
    ) => {
        dispatch({
            type: GlobalSnackbarActions.setSnackbar,
            payload: {
                opened: true,
                message,
                type,
                autoHideDuration
            }
        });
    }, [dispatch]);

    return openSnackbar;
}