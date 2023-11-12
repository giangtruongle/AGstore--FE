import React from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import './styled.scss';
import logo from '../../../assets/logo.png';

const Sidebars = () => {

    return (
        <div>
            <Sidebar className="sidebar-wrapper">
                <img src={logo} alt="" />
                <Menu className="sidebar-menu">
                    <MenuItem >
                        <NavLink to='/admin/users'>
                            Users
                        </NavLink>
                    </MenuItem>
                    <MenuItem >
                        <NavLink to='/admin/product-category'>
                            Product Category
                        </NavLink>
                    </MenuItem>
                    <MenuItem >
                        <NavLink to='/admin/product'>
                            Products
                        </NavLink>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default Sidebars;
