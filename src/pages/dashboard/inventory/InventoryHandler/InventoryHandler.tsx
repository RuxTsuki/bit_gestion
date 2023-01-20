import { useCustomFetch } from '@/customHooks';
import { MeterCollectionResponse, MeterItemResponse } from '@/models';
import { getInventory } from '@/services';
import { InventoryGrid } from '@/ui/molecules/DataGrids';
import { SearchForDataGrids } from '@/ui/molecules/SearchForDataGrids';
import { Button, IconButton } from '@mui/material';
import { AddOutlined, RefreshOutlined } from '@mui/icons-material';
import { useInventoryGridDispatch, useInventoryGridState } from '@/contexts/dataGrids/inventoryGrid/hooks';
import { useEffect, useState } from 'react';
import { InventoryGridStateActions } from '@/contexts/dataGrids/inventoryGrid';

import '../inventory.css';
import { CreateInventoryItem } from '@/ui/molecules/CreateInventoryItem';
import { useShowGlobalSnackbar } from '@/contexts/snackbar';

export const InventoryHandler = () => {
    const { data: { items } } = useInventoryGridState();
    const dispatch = useInventoryGridDispatch();
    const [fetchState, makeRefetch] = useCustomFetch<MeterCollectionResponse>(getInventory());
    const [dataToShow, setDataToShow] = useState<MeterItemResponse[]>([]);
    const showSnackbar = useShowGlobalSnackbar();

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

    useEffect(() => {
        setDataToShow(items);
    }, [items]);

    const onRefresh = async () => {
        const response = await makeRefetch(getInventory(), {});
        if (!response.error) {
            showSnackbar('Data Actualizada', 'info')
        }
    }

    return (
        <>
            <header className='inventory-header'>
                <h1>Inventory</h1>

                <div>
                    <CreateInventoryItem />
                </div>
            </header>

            <div className='custom-line'></div>

            <div className='inventory-aditional-actions'>
                <IconButton onClick={onRefresh} title='recargar informacion'>
                    <RefreshOutlined />
                </IconButton>
                <SearchForDataGrids onSearch={onSearch} gridData={items} valueToFilter='serial' />
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <InventoryGrid data={dataToShow} />
            </div>

        </>
    )
}