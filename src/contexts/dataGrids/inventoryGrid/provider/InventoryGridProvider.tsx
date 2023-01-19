
import { ReactNode, useReducer } from 'react';
import { InventoryGridContext, InventoryGridDispatch } from '../inventoryGridContext';
import { inventoryGridReducer, inventoryGridInitialState } from '../reducer';

export const InventoryGridProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(inventoryGridReducer, inventoryGridInitialState);

    return (
        <InventoryGridContext.Provider value={state}>
            <InventoryGridDispatch.Provider value={dispatch}>
                {children}
            </InventoryGridDispatch.Provider>
        </InventoryGridContext.Provider>
    )
}
