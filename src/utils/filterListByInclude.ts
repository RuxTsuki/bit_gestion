export const filterListByInclude = (list: any[], itemName: string, keyword: string) => {
    return list.filter(item =>
        String(item[itemName]).toLowerCase().includes(keyword.toLowerCase())
    );
}