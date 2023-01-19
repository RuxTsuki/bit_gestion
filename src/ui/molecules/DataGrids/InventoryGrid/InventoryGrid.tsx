import { memo, useEffect, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { ModalDataGridItem } from '@/ui/molecules/ModalDataGridItem';
import { MeterItemResponse, TypeOfView } from '@/models';
import './inventory_grid.css';


// increible 2horas viendo por que se moria
const InventoryGridActions = memo(({ row }: Partial<GridRowParams>) => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<TypeOfView>('view');

    const showRow = () => {
        console.log(row);
        setOpen(true);
    }

    return (
        <div className="action-btns-grid">
            <IconButton onClick={showRow}>
                <SearchOutlined />
            </IconButton>

            <IconButton>
                <EditOutlined />
            </IconButton>

            <IconButton>
                <DeleteOutline />
            </IconButton>

            <ModalDataGridItem
                view={view}
                setView={setView}
                open={open}
                setOpen={setOpen}
                item={row} />
        </div>
    );
})


export const RenderInventoryGridActions = ({ row }: Partial<GridRowParams>) => {
    return (
        <>
            <InventoryGridActions row={row} />
        </>
    );
}

export const InventoryGrid = ({ data = [] }: { data: MeterItemResponse[] }) => {
    const [rows, setRows] = useState<MeterItemResponse[]>([]);

    useEffect(() => {
        setRows(data || []);
    }, [data])


    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70
        },
        {
            field: 'serial',
            headerName: 'Serial', width: 130,
            type: 'number'
        },
        {
            field: 'connection_type',
            headerName: 'Tipo de Conexion',
            width: 130
        },
        {
            field: 'storage_system',
            headerName: 'Sistema de Almacenamiento',
            width: 190,
        },
        {
            field: 'condition',
            headerName: 'Condicion',
            width: 100,
        },
        {
            field: 'owner',
            headerName: 'Dueno',
            width: 100,
        },
        {
            field: 'location',
            headerName: 'Lugar',
            width: 100,
        },
        {
            field: 'manufacturer',
            headerName: 'Fabricante',
            width: 110,
        },
        {
            field: 'purchase',
            headerName: 'Compra',
            width: 110,
        },
        {
            field: 'seals',
            headerName: 'seals',
            width: 100,
        },
        {
            field: 'i_max',
            headerName: 'Inventario Max.',
            width: 100,
            type: 'number'
        },
        {
            field: 'i_b',
            headerName: 'Inventario B.',
            width: 100,
            type: 'number'
        },
        {
            field: 'i_n',
            headerName: 'Inventario N.',
            width: 100,
            type: 'number'
        }, {
            field: "none",
            headerName: "Actions",
            width: 180,
            renderCell: RenderInventoryGridActions
        }
    ];

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                /*  loading={loadingState === 'loading'} */
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </>
    )
}
