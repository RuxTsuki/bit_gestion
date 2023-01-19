import { useCustomFetch } from '@/customHooks';
import { MeterCollectionResponse, MeterItemResponse } from '@/models';
import { getInventory } from '@/services';
import { InventoryGrid } from '@/ui/molecules/DataGrids';
import { SearchForDataGrids } from '@/ui/molecules/SearchForDataGrids';
import { Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { InventoryGridProvider } from '@/contexts/dataGrids/inventoryGrid/provider';
import { useInventoryGridDispatch, useInventoryGridState } from '@/contexts/dataGrids/inventoryGrid/hooks';
import { useEffect, useState } from 'react';
import { InventoryGridStateActions } from '@/contexts/dataGrids/inventoryGrid/inventoryGrid.types';

import './inventory.css';
import { InventoryHandler } from './InventoryHandler/InventoryHandler';


export const Inventory = () => {


    return (
        <div className='inventory-container'>
            <InventoryGridProvider>
                <InventoryHandler />
            </InventoryGridProvider>
        </div>
    )
}