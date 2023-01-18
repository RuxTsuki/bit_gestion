import { Box, Button, FormHelperText, TextField } from '@mui/material';
import InventoryImg from '@/assets/images/InventoryManagement.png';
import './home_content.css';
import { useNavigate } from 'react-router-dom';

export const HomeContent = () => {

    const navigate = useNavigate();

    const getStarted = () => {
        navigate('/login');
    }

    return (
        <main className='home-content'>
            <div>
                <div className='title-banner'>
                    <span>
                        Somos la mejor plataforma
                        para manejar su inventario
                    </span>
                </div>

                <span className='home-text-helper'>
                    La mas completa y de facil manejo
                </span>

                <Button variant='contained' onClick={getStarted}>
                    Empezar
                </Button>
            </div>

            <div className='wallpaper-container'>
                <img src={InventoryImg} alt="" />
            </div>

        </main>
    )
}