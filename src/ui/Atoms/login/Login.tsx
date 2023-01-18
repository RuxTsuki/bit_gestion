import { useState } from 'react';
import { Box, InputLabel, Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import ImgResetPassword from '@/assets/images/reset-password.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import './login.css';


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const inputStyle = {
        boxShadow: 'var(--bg-color) 0 0 0 1000px inset',
        WebkitTextFillColor: 'var(--main-text-color)'
    };

    return (
        <div className='auth-container'>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign In</h1>

                <FormHelperText>Please enter your account.</FormHelperText>

                <Box>
                    <TextField
                        {...register('example', { required: true })}
                        id="outlined-username"
                        label="Username"
                        variant="outlined"
                        inputProps={{ style: inputStyle }}
                    />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            label="Password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ style: inputStyle }}
                        />
                    </FormControl>

                    <Button type="submit" variant='contained'>Login</Button>
                </Box>

            </Box>

            <Box className='auth-image'>
                <Box className='auth-wallpaper'></Box>
                <Box>
                    <img src={ImgResetPassword} alt="img of reset password, one girl in front of a laptop" />
                </Box>
            </Box>
        </div>
    )
}
