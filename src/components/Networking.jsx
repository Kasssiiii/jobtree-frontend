import React from 'react';
import { useUserStore } from '../userStore';
import { RegistrationPage } from './RegistrationPage';
import { NavBar } from './NavBar';

export const Networking = () => {
    const { userData } = useUserStore();
    if (!userData) {
        return <RegistrationPage />;
    }
    return (
        <>
            <NavBar /><div>
                <h1>Networking Page</h1>
                <p>This is a placeholder for the networking page.</p>
            </div>
        </>
    );
};