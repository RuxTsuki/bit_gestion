import { MeterCollectionResponse, MeterItemForUpdate, MeterItemResponse } from '@/models';

// toco any por que no entiendo bien aun la causa del error
export interface InventoryGridState {
    data: MeterCollectionResponse | any;
    itemSelected: MeterItemResponse | {};
}

export enum InventoryGridStateActions {
    setData = 'set_data',
    setItemSelected = 'set_item_selected',
    deleteDataItem = 'delete_data_item',
    updateDataItem = 'update_data_item',
}

export type InventoryGridStateActionType =
    | { type: InventoryGridStateActions.setData, payload: MeterCollectionResponse }
    | { type: InventoryGridStateActions.setItemSelected, payload: MeterItemResponse | {} }
    | { type: InventoryGridStateActions.deleteDataItem, payload: number }
    | { type: InventoryGridStateActions.updateDataItem, payload: { id: number, dataItem: MeterItemForUpdate } }


