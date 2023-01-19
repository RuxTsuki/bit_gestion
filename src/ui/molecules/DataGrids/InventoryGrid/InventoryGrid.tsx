import { AddOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridEventListener, GridRenderCellParams, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridToolbarContainer, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';

export type GridRowsTest = {
    id: number, lastName: string, firstName: string, age: number, isNew: boolean
}

const initialRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, isNew: false },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, isNew: false },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, isNew: false },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, isNew: false },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, isNew: false },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, isNew: false },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, isNew: false },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, isNew: false },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, isNew: false },
];

const RenderDate = (props: GridRenderCellParams<Date>) => {
    const { hasFocus, value, row } = props;
    const buttonElement = useRef<HTMLButtonElement | null>(null);
    const rippleRef = useRef<TouchRippleActions | null>(null);

    useLayoutEffect(() => {
        if (hasFocus) {
            const input = buttonElement.current?.querySelector('input');
            input?.focus();
        } else if (rippleRef.current) {
            // Only available in @mui/material v5.4.1 or later
            rippleRef.current.stop({} as any);
        }
    }, [hasFocus]);

    const onClickBtn = () => {
        console.log(row, value);
    }

    return (
        <>
            <Button
                component="button"
                ref={buttonElement}
                touchRippleRef={rippleRef}
                variant="contained"
                size="small"
                style={{ marginLeft: 16 }}
                // Remove button from tab sequence when cell does not have focus
                tabIndex={hasFocus ? 0 : -1}
                onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.key === ' ') {
                        // Prevent key navigation when focus is on button
                        event.stopPropagation();
                    }
                }}
                onClick={onClickBtn}
            >
                Open
            </Button>
        </>
    );
};

export const InventoryGrid = () => {
    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        }, {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 180,
            cellClassName: 'actions',
            renderCell: RenderDate
        }
    ];

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </>
    )
}

const AddItemToolbar = () => {

    const handleClick = () => {

    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddOutlined />} onClick={handleClick}>
                Agregar Producto
            </Button>
        </GridToolbarContainer>
    );
}