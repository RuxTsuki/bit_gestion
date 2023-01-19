import { Dispatch, createContext } from "react";
import { InventoryGridState, InventoryGridStateActionType } from "./inventoryGrid.types";
import { inventoryGridInitialState } from "./reducer/inventoryGrid.reducer";

export const InventoryGridContext = createContext<InventoryGridState>(inventoryGridInitialState);

export const InventoryGridDispatch = createContext<Dispatch<InventoryGridStateActionType>>(null!);
