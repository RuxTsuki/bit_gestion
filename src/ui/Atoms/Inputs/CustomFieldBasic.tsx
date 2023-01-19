import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material'
import { ChangeEvent } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form';
import './input_with_icon.css';
type Props = {
    title: string,
    value?: string | number,
    onChange?:
    (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => void,
    disabled?: boolean,
    type?: 'text' | 'number',
    paddingTitle?: string;
    register?: UseFormRegisterReturn;
    error?: string;
}

export const CustomFieldBasic = ({ title, error, register, paddingTitle = '10px', type = 'text', disabled = false }: Props) => {

    return (
        <>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    type={type}
                    inputProps={{ ...register }}
                    disabled={disabled}
                    error={!!error}
                    startAdornment={
                        <InputAdornment
                            className='input-Adornment-title'
                            style={{ paddingRight: paddingTitle }}
                            position="end">

                            {title}

                        </InputAdornment>
                    }
                />
                <FormHelperText error>{error}</FormHelperText>
            </FormControl>
        </>
    )
}

export default CustomFieldBasic