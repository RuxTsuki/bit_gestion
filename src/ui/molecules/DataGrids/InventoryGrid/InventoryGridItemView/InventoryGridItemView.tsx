import { MeterItemResponse } from "@/models";
import { InputWithIcon } from "@/ui/Atoms/Inputs";
import './inventory_grid_item_view.css';
import { useForm } from "react-hook-form";
import { Button, IconButton, InputAdornment, Menu, OutlinedInput, Box, MenuList, MenuItem } from "@mui/material";
import { CancelOutlined, DeleteOutline, EditOutlined, SaveOutlined, SettingsOutlined } from "@mui/icons-material";
import { MouseEvent, useState } from "react";

type Props = {
    item: MeterItemResponse;
    view: 'edit' | 'delete' | 'view',
    setView: (view: 'edit' | 'delete' | 'view') => void;
}

export const InventoryGridItemView = ({ item, view, setView }: Props) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: { ...item }
    });

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const paperProps = {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
            }
        }
    };

    const handleEdit = () => {
        setView('edit');
    }

    const handleDelete = () => {

    }

    const handleCancel = () => {
        reset({ ...item });
        setView('view');
        console.log('wtf')
    }

    return (
        <div className="inventory-item-contianer">
            <div className="item-description-container">

                {/* sacar logica en otro comp */}
                <div className="item-header">
                    <h2>Acerca Del Producto</h2>

                    <div>
                        {
                            view !== 'edit'
                                ? <>
                                    <IconButton
                                        onClick={handleEdit}
                                        size="small"
                                    >
                                        <EditOutlined />
                                    </IconButton>

                                    <IconButton
                                        onClick={handleDelete}
                                        size="small"
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                </>
                                : <>
                                    <Button variant="outlined" size="small">
                                        Save
                                    </Button>

                                    <Button onClick={handleCancel} variant="outlined" color="error" size="small">
                                        Cancel
                                    </Button>
                                </>
                        }
                    </div>
                </div>

                <div className="item-specification">
                    <div className="item-data">
                        <div className="first-section">

                            {/* el manejo del padding se podria automatizar pero no tengo tiempo */}
                            <InputWithIcon
                                title={'Serial'}
                                value={item.serial}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                register={register('serial')}
                            />
                            <InputWithIcon
                                title={'Tipo Conexion'}
                                value={item.connection_type}
                                disabled={view !== 'edit'}
                                register={register('connection_type')}
                            />
                            <InputWithIcon
                                title={'Sistema de Almacen'}
                                value={item.storage_system}
                                disabled={view !== 'edit'}
                                register={register('storage_system')}
                            />
                            <InputWithIcon
                                title={'Producto Agregado'}
                                value={item.created_at}
                                disabled={view !== 'edit'}
                                register={register('created_at')}
                            />
                        </div>

                        <div className="second-section">
                            <InputWithIcon
                                title={'Dueno'}
                                value={item.owner}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                register={register('owner')}
                            />
                            <InputWithIcon
                                title={'Lugar'}
                                value={item.location}
                                disabled={view !== 'edit'}
                                register={register('location')}
                            />
                            <InputWithIcon
                                title={'Fabricante'}
                                value={item.manufacturer}
                                disabled={view !== 'edit'}
                                register={register('manufacturer')}
                            />
                            <InputWithIcon
                                title={'Condicion'}
                                value={item.condition}
                                disabled={view !== 'edit'}
                                register={register('condition')}
                            />

                        </div>
                    </div>

                    <div className="item-financial-movements">
                        <InputWithIcon
                            title={'Compras'}
                            value={item.purchase}
                            disabled={view !== 'edit'}
                            register={register('purchase')}
                        />
                        <InputWithIcon
                            title={'Ventas'}
                            value={item.seals}
                            disabled={view !== 'edit'}
                            register={register('seals')}
                        />
                    </div>

                    <div className="item-stock">
                        <InputWithIcon
                            title={'Inventario Max.'}
                            value={item.i_max}
                            disabled={view !== 'edit'}
                            register={register('i_max')}
                        />
                        <InputWithIcon
                            title={'Inventario B.'}
                            value={item.seals}
                            disabled={view !== 'edit'}
                            register={register('seals')}
                        />
                        <InputWithIcon
                            title={'Inventario N.'}
                            value={item.seals}
                            disabled={view !== 'edit'}
                            register={register('seals')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}