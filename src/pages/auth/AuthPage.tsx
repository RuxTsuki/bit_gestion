import { Login } from '@/ui/Atoms/login';
import './auth_page.css';
import { Header } from '@/ui/Atoms/Header';
import { useSetCredentials } from '@/contexts/auth/hooks/useSetCredentials';
import { useNavigateIfAuth } from '@/customHooks/useNavigateIfAuth';

export const AuthPage = () => {
    useSetCredentials();
    useNavigateIfAuth('/dashboard/inventory');

    return (
        <div className='container-password-reset'>
            <div>
                <Header />
                <Login />
            </div>
        </div>
    )
}
