import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { useId } from 'react';
import { Noop, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
    list: string[],
    value: string,
    label: string,
    onChange: (...event: any[]) => void,
    onBlur: Noop,
    disabled?: boolean,
    error?: string
}

export const CustomSelect = ({ list, value, label, error, onChange, onBlur, disabled = false }: Props) => {
    const idForLabels = useId();

    return (
        <>
            <FormControl>
                <InputLabel shrink={true} id={`custom-select-${idForLabels}`}>{label}</InputLabel>
                <Select
                    labelId={`custom-select-${idForLabels}`}
                    label={label}
                    displayEmpty
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    size="small"
                    error={!!error}
                >
                    {
                        list.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
                    }
                </Select>
                <FormHelperText error>{error}</FormHelperText>
            </FormControl>
        </>
    )
}
