import { ConditionOption, ConnectionTypeOption, OwnerOption, StorageSystemOption } from "@/models";

export const patternString = RegExp(/^\w+/g);

export const patternNumber = RegExp(/^[1-9]\d*(\.\d+)?$/);

export const listTypeConnection: ConnectionTypeOption[] = ['directa', 'semi-directa', 'indirecta'];
export const listConditionOption: ConditionOption[] = ['nuevo', 'usado'];
export const listOwnerOption: OwnerOption[] = ['OR', 'RF'];
export const listStorageSystemOption: StorageSystemOption[] = ['externo', 'interno'];

export const patternDate = RegExp(/^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/)

export const UserLocalStorage = 'user';