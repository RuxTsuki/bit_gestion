import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import './sidebar.css';

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
                    <IconButton onClick={() => setOpen(oldValue => !oldValue)}>
                        <MenuOutlinedIcon />
                    </IconButton>

                    {open ? <h1>Enerbite</h1> : null}
                </div>

                <MenuList>
                    {
                        menuItem.map(({ path, name, icon }) =>

                            <NavLink
                                to={path}
                                key={name}
                                className={({ isActive }) =>
                                    isActive ? 'active' : undefined + ' link'
                                }
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>

                                    {open ? <ListItemText>{name}</ListItemText> : null}

                                </MenuItem>
                            </NavLink>
                        )
                    }
                </MenuList>

            </div>
            <main>

            </main>
        </div>
    )
};
