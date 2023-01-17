import { Header } from '@/ui/Atoms/Header';
import { HomeContent } from '@/ui/Atoms/HomeContent';
import { } from 'react'
import './home.css';

export const Home = () => {
    return (
        <div className='home-container'>
            <div>
                <Header />
                <HomeContent />
            </div>
        </div>
    )
};
