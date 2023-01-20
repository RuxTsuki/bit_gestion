
import { InventoryOutlined, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './sidebar.css';
import { useAuthDispatch } from '@/contexts/auth/hooks/useAuthContext';
import { AuthActions } from '@/contexts/auth/auth.types';
import { UserLocalStorage } from '@/utils/defaults';

export const Sidebar = () => {
    const dispatch = useAuthDispatch();
    const navigateTo = useNavigate();
    const [open, setOpen] = useState(false);

    const menuItem = [{
        path: 'inventory',
        name: 'Inventory',
        icon: <InventoryOutlined />
    }]

    const onLogout = () => {
        localStorage.removeItem(UserLocalStorage);
        dispatch({ type: AuthActions.logout });
        navigateTo('/');
    }

    return (
        <div className='sidebar-container'>
            <div className={
                `${open ? 'sidebar-open' : 'sidebar-shrink'}`
            }>
                <div className='top-section'>
                    <IconButton onClick={() => setOpen(oldValue => !oldValue)}>
                        <MenuOutlined />
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
                <div className='sidebar-logout-container'>
                    <IconButton onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </div>
            </div>
        </div>
    )
};
