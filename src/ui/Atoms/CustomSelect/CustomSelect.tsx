import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useId } from 'react';
import { Noop, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
    list: string[],
    value: string,
    label: string,
    onChange: (...event: any[]) => void,
    onBlur: Noop,
    disabled?: boolean,
}

export const CustomSelect = ({ list, value, label, onChange, onBlur, disabled = false }: Props) => {
    const idForLabels = useId();

    return (
        <>
            <FormControl>
                <InputLabel id={`custom-select-${idForLabels}`}>{label}</InputLabel>
                <Select
                    labelId={`custom-select-${idForLabels}`}
                    label={label}
                    displayEmpty
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    size="small"
                >
                    {
                        list.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    )
}
