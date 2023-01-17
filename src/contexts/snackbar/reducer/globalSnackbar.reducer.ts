import { GlobalSnackbar, GlobalSnackbarActionType, GlobalSnackbarActions } from '../globalSnackbar.types'

export const globalSnackbarInitialState: GlobalSnackbar = {
    type: 'success',
    message: '',
    opened: false,
    autoHideDuration: 5500,
    position: {
        vertical: 'bottom',
        horizontal: 'right'
    }
}

export const globalSnackbarReducer = (
    state: GlobalSnackbar,
    action: GlobalSnackbarActionType
) => {
    switch (action.type) {
        case GlobalSnackbarActions.setSnackbar:
            return {
                ...state,
                ...action.payload
            }

        default:
            throw new Error('Unhandled action type');
    }
}