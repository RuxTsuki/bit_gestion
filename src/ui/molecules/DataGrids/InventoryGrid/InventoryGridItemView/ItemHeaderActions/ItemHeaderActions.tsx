import { TypeOfView } from "@/models";
import { Button, IconButton } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import '../inventory_grid_item_view.css';


type Props = {
    view: TypeOfView,
    handleEdit: () => void,
    handleEditCancel: () => void,
    handleSave: () => void,
    handleDelete: () => void,
}

export const ItemHeaderActions = ({ view, handleEdit, handleEditCancel, handleSave, handleDelete }: Props) => {
    return (
        <div>
            {
                view !== 'edit'
                    ? <>
                        <IconButton
                            onClick={handleEdit}
                            size="small"
                        >
                            <EditOutlined />
                        </IconButton>

                        <IconButton
                            onClick={handleDelete}
                            size="small"
                        >
                            <DeleteOutline />
                        </IconButton>
                    </>
                    : <>
                        <Button onClick={handleSave} size="small" variant="outlined">
                            Save
                        </Button>

                        <Button onClick={handleEditCancel} variant="outlined" color="error" size="small">
                            Cancel
                        </Button>
                    </>
            }
        </div>
    )
}