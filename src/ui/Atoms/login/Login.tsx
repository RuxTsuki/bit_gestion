import { useState } from 'react';
import { Box, InputLabel, Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import ImgResetPassword from '@/assets/images/reset-password.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import { useAuthDispatch } from '@/contexts/auth/hooks/useAuthContext';
import { AuthActions } from '@/contexts/auth/auth.types';
import './login.css';
import { UserLocalStorage } from '@/utils/defaults';
import { PASSWORD_DEFAULT, USERNAME_DEFAULT } from '@/utils/userCredentials';


export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [msgLoginError, setMsgLoginError] = useState('');
    const dispatch = useAuthDispatch();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = () => {
        const { username, password } = getValues();
        if (username === USERNAME_DEFAULT && password === PASSWORD_DEFAULT) {
            localStorage.setItem(UserLocalStorage, JSON.stringify({ username, password }))
            dispatch({ type: AuthActions.loginSuccess, payload: { username, password } });
            setMsgLoginError('');
            return;
        }

        setMsgLoginError('Ops... Credenciales Incorrectas');
    };

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

                <FormHelperText error>{msgLoginError}</FormHelperText>

                <Box>
                    <TextField
                        id="outlined-username"
                        label="Username"
                        variant="outlined"
                        inputProps={{ style: inputStyle }}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        {...register('username', { required: 'Username no valido' })}
                    />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            label="Password"
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}
                            {...register('password', { required: 'Contrasenia no valida' })}
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
                        <FormHelperText error={!!errors.password}>{errors.password?.message}</FormHelperText>
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
