import { FormControl, FormControlTypeMap, IconButton, InputAdornment, InputProps, OutlinedInput, OutlinedInputProps } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { ChangeEvent, ReactElement } from 'react'
import { FieldValues, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
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
}

export const InputWithIcon = ({ title, onChange, value, register, paddingTitle = '10px', type = 'text', disabled = false }: Props) => {

    return (
        <>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    type={type}
                    disabled={disabled}
                    {...register}
                    startAdornment={
                        <InputAdornment
                            className='input-Adornment-title'
                            style={{ paddingRight: paddingTitle }}
                            position="end">

                            {title}

                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    )
}

export default InputWithIcon