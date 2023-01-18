import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

export const Sidebar = () => {

    const [open, setOpen] = useState(false);

    const menuItem = [{
        path: 'inventory',
        name: 'Inventory',
        icon: <InventoryOutlinedIcon />
    }]

    return (
        <div className='sidebar-container'>
            <div className={
                `${open ? 'sidebar-open' : 'sidebar-shrink'}`
            }>
                <div className='top-section'>
                    <h1>Enerbite</h1>

                    <div className="bars">
                        <MenuOutlinedIcon />
                    </div>

                </div>
                {
                    menuItem.map(({ path, name, icon }) =>
                        <NavLink
                            to={path}
                            key={name}
                            className={({ isActive }) =>
                                isActive ? 'active' : undefined + ' link'
                            }
                        >
                            <div className='icon'>
                                {icon}
                            </div>
                            <div className="link-text">
                                {name}
                            </div>
                        </NavLink>
                    )
                }

            </div>
            <main>

            </main>
        </div>
    )
};
