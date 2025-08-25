import React from 'react';
import { Link } from 'react-router';

export const NavBar = () => {
    return (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f5f5f5' }}>
            <Link to="/">PostList</Link>
            <Link to="/networking">Networking</Link>
        </div>
    );
};