import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className='navbar'>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/Orders">Orders</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;