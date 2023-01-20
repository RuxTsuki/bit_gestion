import { ReactFragment } from 'react';

export type SnackbarTypes = 'error' | 'success' | 'info' | 'warning';

export interface GlobalSnackbar {
    opened: boolean,
    message: string,
    autoHideDuration?: number,
    type?: SnackbarTypes,
    action?: ReactFragment | null,
    position?: {
        vertical: 'bottom' | 'top',
        horizontal: 'right' | 'left'
    }
}

export enum GlobalSnackbarActions {
    setSnackbar = 'set_snackbar'
}

export type GlobalSnackbarActionType =
    | { type: GlobalSnackbarActions.setSnackbar, payload: GlobalSnackbar }
