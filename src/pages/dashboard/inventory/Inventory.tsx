import { useCustomFetch } from '@/customHooks';
import { MeterCollectionResponse } from '@/models';
import { getInventory } from '@/services';
import { InventoryGrid } from '@/ui/molecules/DataGrids';
import './inventory.css';
import { SearchForDataGrids } from '@/ui/molecules/SearchForDataGrids';
import { Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

export const Inventory = () => {
    /* const [fetchState, fetchData] = useCustomFetch<MeterCollectionResponse>(getInventory());
    console.log(fetchState);
    console.log('wtf'); */

    return (
        <div className='inventory-container'>
            <header className='inventory-header'>
                <h1>Inventory</h1>

                <Button variant='contained' startIcon={<AddOutlined />}>
                    Nuevo Producto
                </Button>
            </header>

            <div className='custom-line'></div>

            <div>
                {/* Mostrar contenido adicional si alcanza el tiempo */}
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <SearchForDataGrids gridData={[]} autoCompleteOpts={['serial', 'locacion']} />
                <InventoryGrid />
            </div>
        </div>
    )
}