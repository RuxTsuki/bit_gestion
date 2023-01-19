import { MeterItemForUpdate, MeterItemResponse, TypeOfView } from "@/models";
import { CustomFieldBasic } from "@/ui/Atoms/Inputs";
import { Controller, useForm } from "react-hook-form";
import { ItemHeaderActions } from "./ItemHeaderActions";
import { patchProduct } from '@/services';
import './inventory_grid_item_view.css';
import { useCustomFetch } from "@/customHooks";
import { useShowGlobalSnackbar } from "@/contexts/snackbar";

type Props = {
    item: MeterItemResponse;
    view: TypeOfView,
    setView: (view: TypeOfView) => void;
    closeModal: (_: any, reason: string) => void;
}

const patternString = RegExp(/^\w+/g);

const patternNumber = RegExp(/^\d+$/);

const patternDate = RegExp(/^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/)

export const InventoryGridItemView = ({ item, view, setView, closeModal }: Props) => {

    const [fetchEditState, makeFetchToEdit] = useCustomFetch();
    const showSnackbar = useShowGlobalSnackbar();

    const { register, control, handleSubmit, getValues, reset, clearErrors, formState: { errors, isValid } } = useForm<MeterItemResponse>({
        defaultValues: { ...item }
    });

    const handleEdit = () => {
        setView('edit');
    }

    const handleSave = async () => {
        console.log('values', getValues());
        console.log('Errors', errors, isValid);

        if (!isValid) return;

        const { id, ...values } = { ...getValues() };
        let valuesToSave: MeterItemForUpdate = {};

        for (const [key, value] of Object.entries(values)) {
            if (value !== '')
                valuesToSave = { ...valuesToSave, [key]: value }
        }

        const { url, fetchOpts } = patchProduct(id, valuesToSave)
        const response = await makeFetchToEdit(url, fetchOpts);

        if (response.error) {
            closeModal('', 'CloseByAction');
            return;
        }

        console.log(response);
    }

    const handleDelete = () => {

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
                            <CustomFieldBasic
                                title={'Tipo Conexion'}
                                disabled={view !== 'edit'}
                                error={errors.connection_type?.message}
                                register={register('connection_type', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
                            />
                            <CustomFieldBasic
                                title={'Sistema de Almacen'}
                                disabled={view !== 'edit'}
                                error={errors.storage_system?.message}
                                register={register('storage_system', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
                            />
                            {/* <Controller
                                control={control}
                                name='created_at'
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
                        </div>

                        <div className="second-section">
                            <CustomFieldBasic
                                title={'Dueno'}
                                disabled={view !== 'edit'}
                                paddingTitle="65px"
                                error={errors.owner?.message}
                                register={register('owner', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
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
                            <CustomFieldBasic
                                title={'Condicion'}
                                disabled={view !== 'edit'}
                                error={errors.condition?.message}
                                register={register('condition', {
                                    pattern: {
                                        value: patternString,
                                        message: "Solo se aceptan Alphanumericos"
                                    }
                                })}
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
        </div>
    )
}