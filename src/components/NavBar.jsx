import React from 'react';
import { Link } from 'react-router';
import './NavBar.css';

export const NavBar = () => (
    <nav className="navbar">
        <Link to="/">Job Board</Link>
        <Link to="/networking">Networking</Link>
    </nav>
);