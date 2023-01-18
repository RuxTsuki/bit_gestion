import { useState } from 'react';
import { Box, InputLabel, Button, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material';
import ImgResetPassword from '@/assets/images/reset-password.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from "react-hook-form";
import { Login } from '@/ui/Atoms/login';
import './auth_page.css';
import { Header } from '@/ui/Atoms/Header';


export const AuthPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className='container-password-reset'>
            <div>
                <Header />
                <Login />
            </div>
        </div>
    )
}
