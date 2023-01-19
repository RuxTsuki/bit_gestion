import { useCustomFetch } from '@/customHooks';
import { MeterCollectionResponse, MeterItemResponse } from '@/models';
import { getInventory } from '@/services';
import { InventoryGrid } from '@/ui/molecules/DataGrids';
import { SearchForDataGrids } from '@/ui/molecules/SearchForDataGrids';
import { Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useInventoryGridDispatch, useInventoryGridState } from '@/contexts/dataGrids/inventoryGrid/hooks';
import { useEffect, useState } from 'react';
import { InventoryGridStateActions } from '@/contexts/dataGrids/inventoryGrid';

import '../inventory.css';

export const InventoryHandler = () => {
    const { data } = useInventoryGridState();
    const dispatch = useInventoryGridDispatch();
    const [fetchState] = useCustomFetch<MeterCollectionResponse>(getInventory());
    const [dataToShow, setDataToShow] = useState<MeterItemResponse[]>([])

    useEffect(() => {
        if (fetchState.error || !fetchState.data) return;

        dispatch({
            type: InventoryGridStateActions.setData,
            payload: fetchState.data
        });

        setDataToShow(fetchState.data.items);
    }, [fetchState])

    const onSearch = (dataFiltered: MeterItemResponse[]) => {
        setDataToShow(dataFiltered);
    }

    return (
        <>
            <header className='inventory-header'>
                <h1>Inventory</h1>

                <Button variant='contained' startIcon={<AddOutlined />}>
                    Nuevo Producto
                </Button>
            </header>

            <div className='custom-line'></div>

            <SearchForDataGrids onSearch={onSearch} gridData={data.items} valueToFilter='serial' />

            <div style={{ height: 400, width: '100%' }}>
                <InventoryGrid data={dataToShow} />
            </div>
        </>
    )
}