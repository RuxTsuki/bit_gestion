import { MeterItemResponse } from "@/models"
import { InventoryGridState, InventoryGridStateActionType, InventoryGridStateActions } from "../inventoryGrid.types"

export const inventoryGridInitialState = {
    data: {
        items: [],
        next_page: 0,
        page: 0,
        pages: 0,
        previous_page: 0,
        size: 0,
        total: 0
    },
    itemSelected: {}
}

export const inventoryGridReducer = (
    state: InventoryGridState,
    action: InventoryGridStateActionType
) => {
    switch (action.type) {
        case InventoryGridStateActions.setData:
            return {
                ...state,
                data: { ...state.data, ...action.payload }
            }
        case InventoryGridStateActions.setItemSelected:
            return {
                ...state,
                itemSelected: { ...state.itemSelected, ...action.payload }
            }
        case InventoryGridStateActions.deleteDataItem:
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.filter((item: MeterItemResponse) => item.id !== action.payload)
                }
            }
        case InventoryGridStateActions.updateDataItem:
            return {
                ...state,
                data: {
                    ...state.data,
                    items: state.data.items.map((item: MeterItemResponse) => {
                        if (item.id === action.payload.id)
                            return {
                                ...item,
                                ...action.payload.dataItem
                            }

                        return item;
                    })
                }
            }

        default:
            throw new Error('Unhandled action type');
    }

}