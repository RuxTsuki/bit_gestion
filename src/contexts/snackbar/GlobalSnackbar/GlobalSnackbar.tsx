import Snackbar from '@mui/material/Snackbar';
import { GlobalSnackbarActions } from '../globalSnackbar.types';
import { useGetGlobalSnackbar, useGetGlobalSnackbarDispatch } from '../hooks';
// import { forwardRef } from 'react';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
/* const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 */
export const GlobalSnackbar = () => {
    const { message, opened, type, action, autoHideDuration, position } = useGetGlobalSnackbar();
    const dispatch = useGetGlobalSnackbarDispatch();

    const { vertical, horizontal } = position ?? { vertical: 'bottom', horizontal: 'right' };

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type: GlobalSnackbarActions.setSnackbar,
            payload: {
                message: '',
                opened: false,
                action: null
            }
        });
    };

    return (
        <div id="global-snackbar">

            <Snackbar
                open={opened}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
                message={message}
                action={action}
                anchorOrigin={{ vertical, horizontal }}
            />

        </div>
    );
};
