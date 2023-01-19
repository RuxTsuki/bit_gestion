import { MeterItemResponse, TypeOfView } from "@/models";
import { CustomFieldBasic } from "@/ui/Atoms/Inputs";
import { useForm } from "react-hook-form";
import { ItemHeaderActions } from "./ItemHeaderActions";
import './inventory_grid_item_view.css';

type Props = {
    item: MeterItemResponse;
    view: TypeOfView,
    setView: (view: TypeOfView) => void;
}

export const InventoryGridItemView = ({ item, view, setView }: Props) => {

    const { register, getValues, reset, watch, formState: { errors } } = useForm({
        defaultValues: { ...item }
    });

    const handleEdit = () => {
        setView('edit');
    }

    const handleSave = () => {
        console.log(getValues());
    }

    const handleDelete = () => {

    }

    const handleCancel = () => {
        reset({ ...item });
        setView('view');
    }

    return (
        <div className="inventory-item-contianer">
            <div className="item-description-container">

                {/* sacar logica en otro comp */}
                <div className="item-header">
                    <h2>Acerca Del Producto</h2>

                    <ItemHeaderActions
                        view={view}
                        handleEdit={handleEdit}
                        handleEditCancel={handleCancel}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                    />
                </div>

                <div className="item-specification">
                    <div className="item-data">
                        <div className="first-section">

                            {/* el manejo del padding se podria automatizar pero no tengo tiempo */}
                            <CustomFieldBasic
                                title={'Serial'}
                                value={item.serial}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                register={register('serial')}
                            />
                            <CustomFieldBasic
                                title={'Tipo Conexion'}
                                value={item.connection_type}
                                disabled={view !== 'edit'}
                                register={register('connection_type')}
                            />
                            <CustomFieldBasic
                                title={'Sistema de Almacen'}
                                value={item.storage_system}
                                disabled={view !== 'edit'}
                                register={register('storage_system')}
                            />
                            <CustomFieldBasic
                                title={'Producto Agregado'}
                                value={item.created_at}
                                disabled={view !== 'edit'}
                                register={register('created_at')}
                            />
                        </div>

                        <div className="second-section">
                            <CustomFieldBasic
                                title={'Dueno'}
                                value={item.owner}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                register={register('owner')}
                            />
                            <CustomFieldBasic
                                title={'Lugar'}
                                value={item.location}
                                disabled={view !== 'edit'}
                                register={register('location')}
                            />
                            <CustomFieldBasic
                                title={'Fabricante'}
                                value={item.manufacturer}
                                disabled={view !== 'edit'}
                                register={register('manufacturer')}
                            />
                            <CustomFieldBasic
                                title={'Condicion'}
                                value={item.condition}
                                disabled={view !== 'edit'}
                                register={register('condition')}
                            />

                        </div>
                    </div>

                    <div className="item-financial-movements">
                        <CustomFieldBasic
                            title={'Comprado en'}
                            value={item.purchase}
                            disabled={view !== 'edit'}
                            register={register('purchase')}
                        />
                        <CustomFieldBasic
                            title={'Ventas'}
                            value={item.seals}
                            disabled={view !== 'edit'}
                            register={register('seals')}
                        />
                    </div>

                    <div className="item-stock">
                        <CustomFieldBasic
                            title={'Inventario Max.'}
                            value={item.i_max}
                            disabled={view !== 'edit'}
                            register={register('i_max')}
                        />
                        <CustomFieldBasic
                            title={'Inventario B.'}
                            value={item.i_b}
                            disabled={view !== 'edit'}
                            register={register('i_b')}
                        />
                        <CustomFieldBasic
                            title={'Inventario N.'}
                            value={item.i_n}
                            disabled={view !== 'edit'}
                            register={register('i_n')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}