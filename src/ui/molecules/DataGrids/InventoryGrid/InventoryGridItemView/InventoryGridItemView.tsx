import { ConditionOption, ConnectionTypeOption, MeterItemForUpdate, MeterItemResponse, OwnerOption, StorageSystemOption, TypeOfView } from "@/models";
import { CustomFieldBasic } from "@/ui/Atoms/Inputs";
import { Controller, useForm } from "react-hook-form";
import { ItemHeaderActions } from "./ItemHeaderActions";
import { deleteProduct, patchProduct } from '@/services';
import { useCustomFetch } from "@/customHooks";
import { useShowGlobalSnackbar } from "@/contexts/snackbar";
import { InventoryGridStateActions, useInventoryGridDispatch } from "@/contexts/dataGrids/inventoryGrid";
import { CustomSelect } from "@/ui/Atoms/CustomSelect";
import { ModalConfirmation } from "@/ui/Atoms/ModalConfirmation";
import { useState } from "react";
import './inventory_grid_item_view.css';
import { useDeleteInventoryItem } from "@/customHooks/useDeleteInventoryItem";

type Props = {
    item: MeterItemResponse;
    view: TypeOfView,
    setView: (view: TypeOfView) => void;
    closeModal: (_: any, reason: string) => void;
}

const patternString = RegExp(/^\w+/g);

const patternNumber = RegExp(/^[1-9]\d*(\.\d+)?$/);

const listTypeConnection: ConnectionTypeOption[] = ['directa', 'semi-directa', 'indirecta', ''];
const listConditionOption: ConditionOption[] = ['nuevo', 'usado', ''];
const listOwnerOption: OwnerOption[] = ['OR', 'RF', ''];
const listStorageSystemOption: StorageSystemOption[] = ['externo', 'interno', ''];

const patternDate = RegExp(/^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/)

export const InventoryGridItemView = ({ item, view, setView, closeModal }: Props) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [_, makeFetch] = useCustomFetch();
    const showSnackbar = useShowGlobalSnackbar();
    const dispatch = useInventoryGridDispatch();
    const onDeleteItem = useDeleteInventoryItem()

    const { register, control, handleSubmit, getValues, reset, clearErrors, formState: { errors, isValid } } = useForm<MeterItemResponse>({
        defaultValues: { ...item }
    });

    const handleEdit = () => {
        setView('edit');
    }

    const handleSave = async () => {

        if (!isValid) return;

        const { id, ...values } = { ...getValues() };
        let valuesToSave: MeterItemForUpdate = {};

        for (const [key, value] of Object.entries(values)) {
            if (value !== '')
                valuesToSave = { ...valuesToSave, [key]: value }
        }

        const { url, fetchOpts } = patchProduct(id, valuesToSave)
        const response = await makeFetch(url, fetchOpts);

        if (!response.error) {
            showSnackbar('Registro Editado', 'success');
            dispatch({
                type: InventoryGridStateActions.updateDataItem,
                payload: { id, dataItem: valuesToSave }
            })
        }

        closeModal('', 'CloseByAction');
    }

    const handleDelete = () => {
        setOpenConfirm(true);
    }

    const onDelete = async (wantContinue: boolean) => {
        if (!wantContinue) return;

        await onDeleteItem(item.id);
        closeModal('', 'CloseByAction');
    }

    const handleCancel = () => {
        onReset();
    }

    const onReset = () => {
        reset({ ...item });
        clearErrors();
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
                        handleSave={handleSubmit(handleSave)}
                        handleDelete={handleDelete}
                    />
                </div>

                <div className="item-specification">
                    <div className="item-data">

                        <div className="first-section">

                            <CustomFieldBasic
                                title={'Serial'}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                error={errors.serial?.message}
                                register={register('serial', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
                            />

                            <Controller
                                control={control}
                                name='connection_type'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomSelect
                                        label="Tipo De Conexion"
                                        disabled={view !== 'edit'}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        list={listTypeConnection}
                                    />
                                )
                                }
                            />

                            <Controller
                                control={control}
                                name='storage_system'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomSelect
                                        label="Sistema de Almacen"
                                        disabled={view !== 'edit'}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        list={listStorageSystemOption}
                                    />
                                )
                                }
                            />
                        </div>

                        <div className="second-section">

                            <Controller
                                control={control}
                                name='owner'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomSelect
                                        label="Dueno"
                                        disabled={view !== 'edit'}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        list={listOwnerOption}
                                    />
                                )
                                }
                            />

                            <CustomFieldBasic
                                title={'Lugar'}
                                disabled={view !== 'edit'}
                                error={errors.location?.message}
                                register={register('location', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
                            />
                            <CustomFieldBasic
                                title={'Fabricante'}
                                disabled={view !== 'edit'}
                                error={errors.manufacturer?.message}
                                register={register('manufacturer', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
                            />

                            <Controller
                                control={control}
                                name='condition'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomSelect
                                        label="Condicion"
                                        disabled={view !== 'edit'}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        list={listConditionOption}
                                    />
                                )
                                }
                            />
                        </div>
                    </div>

                    <div className="item-financial-movements">


                        {/* <CustomFieldBasic
                            title={'Comprado en'}
                            disabled={view !== 'edit'}
                            register={register('purchase')}
                        /> */}
                        {/* <Controller
                            control={control}
                            name='purchase'
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error }
                            }) => {
                                return (
                                    < input type="datetime-local"
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    />
                                )
                            }
                            }
                        /> */}

                        <CustomFieldBasic
                            title={'Ventas'}
                            disabled={view !== 'edit'}
                            error={errors.seals?.message}
                            register={register('seals', {
                                pattern: {
                                    value: patternNumber,
                                    message: "Solo se aceptan valores numericos"
                                }
                            })
                            }
                        />
                    </div>

                    <div className="item-stock">
                        <CustomFieldBasic
                            title={'Inventario Max.'}
                            disabled={view !== 'edit'}
                            error={errors.i_max?.message}
                            register={register('i_max', {
                                pattern: {
                                    value: patternNumber,
                                    message: "Solo se aceptan valores numericos"
                                }
                            })}
                        />
                        <CustomFieldBasic
                            title={'Inventario B.'}
                            disabled={view !== 'edit'}
                            error={errors.i_b?.message}
                            register={register('i_b', {
                                pattern: {
                                    value: patternNumber,
                                    message: "Solo se aceptan valores numericos"
                                }
                            })}
                        />
                        <CustomFieldBasic
                            title={'Inventario N.'}
                            disabled={view !== 'edit'}
                            error={errors.i_n?.message}
                            register={register('i_n', {
                                pattern: {
                                    value: patternNumber,
                                    message: "Solo se aceptan valores numericos"
                                }
                            })}
                        />
                    </div>
                </div>
            </div>

            <ModalConfirmation msg="Desea eliminar el producto?" open={openConfirm} setOpen={setOpenConfirm} confirmAction={onDelete} />
        </div>
    )
}