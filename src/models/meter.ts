export interface MeterItemForUpdate {
    connection_type?: string,
    storage_system?: string,
    condition?: string,
    owner?: string,
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
    serial: number,
    connection_type: string,
    storage_system: string,
    condition: string,
    owner: string,
    location: string,
    manufacturer: string,
    purchase: string,
    i_max: number,
    i_b: number,
    i_n: number,
    seals: number,
    id: number,
    created_at: string,
    updated_at: string
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
