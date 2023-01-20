import { Sidebar } from '@/ui/molecules/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboard.css';
import { useAuthState } from '@/contexts/auth/hooks/useAuthContext';
import { AuthStateType } from '@/contexts/auth/auth.types';
import { useEffect } from 'react';

export const Dashboard = () => {
    const { state } = useAuthState();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (state === AuthStateType.notAuthenticated) {
            navigateTo('/login');
        }
    }, []);

    return (
        <div className='dashboard-container'>
            <Sidebar />

            <div>
                <Outlet />
            </div>
        </div>
    )
}