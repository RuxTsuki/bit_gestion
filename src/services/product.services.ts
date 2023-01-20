import { apiMeter, baseUrl } from "@/api/config"
import { MeterItemForUpdate } from "@/models";

const headers = {
    'Content-Type': 'application/json'
}

export const getProduct = (id: number) => {
    return `${baseUrl}/${apiMeter}/${id}`;
}

export const patchProduct = (id: number, productData: MeterItemForUpdate): {
    url: string,
    fetchOpts: RequestInit
} => {

    const body = JSON.stringify(productData);

    return {
        url: `${baseUrl}/${apiMeter}/${id}`,
        fetchOpts: {
            method: 'PATCH',
            body,
            headers
        }
    };
}

export const deleteProduct = (id: number): {
    url: string,
    fetchOpts: RequestInit
} => {

    return {
        url: `${baseUrl}/${apiMeter}/${id}`,
        fetchOpts: {
            method: 'DELETE',
            headers
        }
    }
}

export const createProduct = (productData: MeterItemForUpdate) => {
    const body = JSON.stringify(productData);

    return {
        url: `${baseUrl}/${apiMeter}`,
        fetchOpts: {
            method: 'POST',
            body,
            headers
        }
    };
}