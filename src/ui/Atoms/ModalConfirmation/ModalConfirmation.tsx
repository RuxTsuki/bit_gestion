
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

export interface ConfirmationDialogRawProps {
    msg: string,
    open: boolean;
    title?: string,
    setOpen: (closeModal: boolean) => void;
    confirmAction: (canContinue: boolean) => void;
}

export const ModalConfirmation = ({ open, setOpen, confirmAction, title = 'Por favor confirme', msg = '' }: ConfirmationDialogRawProps) => {

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        confirmAction(true);
        setOpen(false);
    };

    return (
        <>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={open}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers>
                    <h3>{msg}</h3>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleOk}>Ok</Button>
                    <Button variant='outlined' color='error' autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
