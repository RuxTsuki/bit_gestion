import { TextField } from '@mui/material'
import { UseFormRegisterReturn } from 'react-hook-form';
import './input_with_icon.css';

type Props = {
    title: string,
    value?: string | number,
    disabled?: boolean,
    type?: 'text' | 'number',
    paddingTitle?: string;
    register?: UseFormRegisterReturn;
    error?: string;
}

/**
 * Field to handle data with lib custom forms
 * @param param0 
 * @returns 
 */
export const CustomFieldBasic = ({ title, error, register, type = 'text', disabled = false }: Props) => {

    return (
        <>
            {/* other design for input */}
            {/* <FormControl fullWidth variant="outlined">
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
            </FormControl> */}

            <TextField
                label={title}
                type={type}
                inputProps={{ ...register }}
                disabled={disabled}
                helperText={error}
                error={!!error}
                InputLabelProps={{ shrink: true }}
                fullWidth
                variant="outlined"
                size="small" />
        </>
    )
}

export default CustomFieldBasic