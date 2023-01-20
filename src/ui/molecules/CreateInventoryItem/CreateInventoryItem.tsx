import { Button } from "@mui/material"
import { ModalDataGridItem } from '@/ui/molecules/ModalDataGridItem';
import { useState } from "react";
import { TypeOfView } from "@/models";
import { AddOutlined } from "@mui/icons-material";


export const CreateInventoryItem = () => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<TypeOfView>('view');

    const handleCreateItem = () => {
        setView('create');
        setOpen(true);
    }


    return (
        <>
            <Button onClick={handleCreateItem} variant='contained' startIcon={<AddOutlined />}>
                Nuevo Producto
            </Button>

            <ModalDataGridItem
                view={view}
                setView={setView}
                open={open}
                setOpen={setOpen}
            />

        </>
    )
}
