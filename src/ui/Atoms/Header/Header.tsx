import { Link } from 'react-router-dom';
import { EnerbitLogo } from '../svgs';
import './header.css';

export const Header = () => {
    return (
        <header className='main-header'>
            <div className="logo">
                <EnerbitLogo className="enerbit-logo" />
            </div>

            <div className="menu-items">
                <Link to={'/'}>Inicio</Link>
                <Link to={'/'}>About</Link>
            </div>
        </header>
    )
}
