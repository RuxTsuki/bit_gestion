import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { MeterItemResponse } from '@/models';
import { InventoryGridItemView } from '../DataGrids';
import { IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import './modal_data_grid_item.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 6,
    p: 6
};

type Props = {
    item: MeterItemResponse,
    open: boolean,
    setOpen: (open: boolean) => void
    action: 'view' | 'edit' | 'delete',
    actionFunc: () => void
}

export const ModalDataGridItem = ({ item, action, open = false, setOpen, actionFunc }: Props) => {

    const handleOpen = () => setOpen(true);
    const handleClose = (_: any, reason: string) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal-data-grid-item"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={() => handleClose('', 'closeByIcon')}
                        className='close-icon'>
                        <CloseOutlined />
                    </IconButton>

                    <InventoryGridItemView item={item} view={action} />
                </Box>
            </Modal>
        </div>
    );
}