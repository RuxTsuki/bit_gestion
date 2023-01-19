import { FormControl, FormControlTypeMap, IconButton, InputAdornment, InputProps, OutlinedInput, OutlinedInputProps } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { ChangeEvent, ReactElement } from 'react'

type Props = {
    onChange:
    (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => void,
    Icon?: ReactElement,
    value?: string | number,
    disabled?: boolean,
    type?: 'text' | 'number'
}

export const InputWithIcon = ({ Icon, onChange, value, type = 'text', disabled = false }: Props) => {

    return (
        <>
            <FormControl variant="outlined">
                <OutlinedInput
                    size="small"
                    type={type}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    startAdornment={
                        Icon
                            ? <InputAdornment position="end">
                                <IconButton
                                    edge="start"
                                >
                                    {Icon}
                                </IconButton>

                            </InputAdornment>
                            : null
                    }
                />
            </FormControl>
        </>
    )
}

export default InputWithIcon