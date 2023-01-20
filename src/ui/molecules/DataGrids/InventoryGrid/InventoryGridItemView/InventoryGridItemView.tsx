import { listTypeConnection, patternString, listStorageSystemOption, listConditionOption, listOwnerOption, patternDate, patternNumber } from "@/utils/defaults";
import { MeterItemForUpdate, MeterItemResponse, TypeOfView, defaultMeterValues } from "@/models";
import { CustomFieldBasic } from "@/ui/Atoms/Inputs";
import { Controller, useForm } from "react-hook-form";
import { ItemHeaderActions } from "./ItemHeaderActions";
import { createProduct, patchProduct } from '@/services';
import { useCustomFetch } from "@/customHooks";
import { useShowGlobalSnackbar } from "@/contexts/snackbar";
import { InventoryGridStateActions, useInventoryGridDispatch } from "@/contexts/dataGrids/inventoryGrid";
import { CustomSelect } from "@/ui/Atoms/CustomSelect";
import { ModalConfirmation } from "@/ui/Atoms/ModalConfirmation";
import { useState } from "react";
import { useDeleteInventoryItem } from "@/customHooks/useDeleteInventoryItem";

import './inventory_grid_item_view.css';

type Props = {
    item?: MeterItemResponse | MeterItemForUpdate;
    view: TypeOfView,
    setView: (view: TypeOfView) => void;
    closeModal: (_: any, reason: string) => void;
}

export const InventoryGridItemView = ({ item = {
    condition: '',
    connection_type: '',
    storage_system: '',
    owner: ''
}, view, setView, closeModal }: Props) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [_, makeFetch] = useCustomFetch();
    const showSnackbar = useShowGlobalSnackbar();
    const dispatch = useInventoryGridDispatch();
    const onDeleteItem = useDeleteInventoryItem();

    const { register, control, handleSubmit, getValues, reset, clearErrors, formState, formState: { errors, isValid } } = useForm<MeterItemResponse>({
        defaultValues: { ...item }
    });

    const handleEdit = () => {
        setView('edit');
    }

    const handleSave = async () => {

        if (!isValid) return;

        const { id, ...values } = { ...getValues() };
        let valuesToSave: MeterItemForUpdate = {
            ...defaultMeterValues
        };

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

    const handleCreate = async () => {
        if (!isValid) return;

        const { id, ...values } = { ...getValues() };
        let valuesToSave: MeterItemForUpdate = {
            ...defaultMeterValues
        };

        for (const [key, value] of Object.entries(values)) {
            if (value !== '')
                valuesToSave = { ...valuesToSave, [key]: value }
        }

        const { url, fetchOpts } = createProduct(valuesToSave);
        const response = await makeFetch(url, fetchOpts);

        if (!response.error) {
            showSnackbar('Registro Creado', 'success');
            const dataResponse = response.data as any;
            dispatch({
                type: InventoryGridStateActions.newDataItem,
                payload: { id: dataResponse.id, dataItem: valuesToSave }
            })
        }

        closeModal('', 'CloseByAction');
    }

    const handleCreateCancel = () => {
        onReset();
        closeModal('', 'CloseByAction');
    }

    const onDelete = async (wantContinue: boolean) => {
        if (!wantContinue) return;

        const itemId = (item as MeterItemResponse).id
        if (!itemId) return;

        await onDeleteItem(itemId);
        closeModal('', 'CloseByAction');
    }

    const handleCancel = () => {
        onReset();
        setView('view');
    }

    const onReset = () => {
        reset({ ...item });
        clearErrors();
    }

    const disabledCondition = view === 'view';

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
                        handleCreate={handleSubmit(handleCreate)}
                        handleCreateCancel={handleCreateCancel}
                    />
                </div>

                <div className="item-specification">
                    <div className="item-data">

                        <div className="first-section">

                            <CustomFieldBasic
                                title={'Serial'}
                                disabled={disabledCondition}
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
                                rules={{ required: 'Por favor seleccione una opcion' }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error } }) => (
                                    <CustomSelect
                                        label="Tipo De Conexion"
                                        error={error?.message}
                                        disabled={disabledCondition}
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
                                rules={{ required: 'Por favor seleccione una opcion' }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error } }) => (
                                    <CustomSelect
                                        label="Sistema de Almacen"
                                        error={error?.message}
                                        disabled={disabledCondition}
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
                                rules={{ required: 'Por favor seleccione una opcion' }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error }
                                }) => (
                                    <CustomSelect
                                        label="Dueno"
                                        error={error?.message}
                                        disabled={disabledCondition}
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
                                disabled={disabledCondition}
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
                                disabled={disabledCondition}
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
                                rules={{ required: 'Por favor seleccione una opcion' }}
                                render={({
                                    field: { onChange, onBlur, value },
                                    fieldState: { error } }) => (
                                    <CustomSelect
                                        label="Condicion"
                                        error={error?.message}
                                        disabled={disabledCondition}
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
                            disabled={disabledCondition}
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
                            disabled={disabledCondition}
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
                            disabled={disabledCondition}
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
                            disabled={disabledCondition}
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
                            disabled={disabledCondition}
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