import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MeterItemForUpdate, MeterItemResponse, TypeOfView } from '@/models';
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
    item?: MeterItemResponse | MeterItemForUpdate,
    view: TypeOfView,
    open: boolean,
    setOpen: (open: boolean) => void,
    setView: (view: TypeOfView) => void;
}

export const ModalDataGridItem = ({ item, view, open = false, setView, setOpen }: Props) => {

    const handleOpen = () => setOpen(true);
    const handleClose = (_: any, reason: string) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setView('view');
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

                    <InventoryGridItemView item={item} view={view} setView={setView} closeModal={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}