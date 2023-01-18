import { Sidebar } from '@/ui/molecules/Sidebar'
import { Outlet } from 'react-router-dom';
import './dashboard.css';

export const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <Sidebar />

            <div>
                <Outlet />
            </div>
        </div>
    )
}