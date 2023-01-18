import { apiMeter, baseUrl } from "@/api/config"

export const getInventory = () => {
    return `${baseUrl}/${apiMeter}`;
}

export const getInventoryWithOptions = ({ page = 1, pageSize = 10 }: any) => {
    return `${baseUrl}/${apiMeter}?page=${page}&size=${pageSize}`;
}
