import { useSetCredentials } from '@/contexts/auth/hooks/useSetCredentials';
import { Header } from '@/ui/Atoms/Header';
import { HomeContent } from '@/ui/Atoms/HomeContent';
import { } from 'react'
import './home.css';

export const Home = () => {
    useSetCredentials();

    return (
        <div className='home-container fadeIn'>
            <div>
                <Header />
                <HomeContent />
            </div>
        </div>
    )
};
