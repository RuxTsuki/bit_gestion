export type StorageSystemOption = 'interno' | 'externo' | '';

export type OwnerOption = 'RF' | 'OR' | '';

export type ConditionOption = 'nuevo' | 'usado' | '';

export type ConnectionTypeOption = 'directa' | 'semi-directa' | 'indirecta' | '';

export const DefaultStorageSystem: StorageSystemOption = 'interno';
export const DefaultConditionOption: ConditionOption = 'nuevo';
export const DefaultOwnerOption: OwnerOption = 'RF';
export const DefaultConnectionTypeOption: ConnectionTypeOption = 'directa';


export const defaultMeterValues = {
    condition: DefaultConditionOption,
    owner: DefaultOwnerOption,
    storage_system: DefaultStorageSystem,
    connection_type: DefaultConnectionTypeOption
}

export interface MeterItemForUpdate {
    connection_type: ConnectionTypeOption | '',
    storage_system: StorageSystemOption | '',
    condition: ConditionOption | '',
    owner: OwnerOption | '',
    serial?: string,
    location?: string,
    purchase?: string,
    i_max?: number,
    i_b?: number,
    i_n?: number,
    manufacturer?: string,
    seals?: number
}

export interface MeterItemResponse {
    connection_type: ConnectionTypeOption,
    storage_system: StorageSystemOption,
    condition: ConditionOption,
    owner: OwnerOption,
    serial: string,
    location: string,
    manufacturer: string,
    purchase: string,
    i_max: number,
    i_b: number,
    i_n: number,
    seals: number,
    id: number
}

export interface MeterCollectionResponse {
    items: MeterItemResponse[],
    page: number,
    size: number,
    total: number,
    pages: number,
    next_page: number,
    previous_page: number
}

export interface MeterErrorDetail {
    loc: string[],
    msg: string,
    type: string
}

export interface MeterErrorResponse {
    detail: MeterErrorDetail[];
}

export type TypeOfView = 'edit' | 'delete' | 'view' | 'create';