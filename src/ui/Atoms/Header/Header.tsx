import { EnerbitLogo } from '../svgs';
import './header.css';

export const Header = () => {
    return (
        <header className='main-header'>
            <div className="logo">
                <EnerbitLogo className="enerbit-logo" />
            </div>

            <div className="menu-items">
                <span>Home</span>
                <span>About</span>
            </div>
        </header>
    )
}
