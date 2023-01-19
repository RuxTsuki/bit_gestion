import { useContext } from "react";
import { InventoryGridContext, InventoryGridDispatch } from './../inventoryGridContext';

export const useInventoryGridState = () => {
    const context = useContext(InventoryGridContext);

    if (!context)
        throw new Error('InventoryGridContext must be used within a InventoryGridProvider');

    return context;
};

export const useInventoryGridDispatch = () => {
    const context = useContext(InventoryGridDispatch);

    if (!context)
        throw new Error('InventoryGridDispatch must be used within a InventoryGridProvider');

    return context;
};