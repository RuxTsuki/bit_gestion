import { useShowGlobalSnackbar } from "@/contexts/snackbar";
import { useCustomFetch } from "./useCustomFetch";
import { InventoryGridStateActions, useInventoryGridDispatch } from "@/contexts/dataGrids/inventoryGrid";
import { deleteProduct } from "@/services";

export const useDeleteInventoryItem = () => {
    const [_, makeFetch] = useCustomFetch();
    const showSnackbar = useShowGlobalSnackbar();
    const dispatch = useInventoryGridDispatch();

    const onDelete = async (id: number) => {

        const { url, fetchOpts } = deleteProduct(id)
        const response = await makeFetch(url, fetchOpts);

        if (!response.error) {
            showSnackbar('Registro Eliminado', 'success');
            dispatch({
                type: InventoryGridStateActions.deleteDataItem,
                payload: id
            })
        }
    }

    return onDelete
}