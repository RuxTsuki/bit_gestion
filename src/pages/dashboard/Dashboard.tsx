import { Sidebar } from '@/ui/molecules/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom';
import './dashboard.css';
import { useRedirectIfNotAuth } from '@/customHooks/useNavigateIfAuth';

export const Dashboard = () => {
    useRedirectIfNotAuth();

    return (
        <div className='dashboard-container'>
            <Sidebar />

            <div>
                <Outlet />
            </div>
        </div>
    )
}