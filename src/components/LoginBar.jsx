import React, { useState } from "react";

import "./LoginBar.css";

import { loginUser } from "../jobTreeApi";
import { useUserStore } from "../userStore";

export const LoginBar = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setUserData, clearUserData, userData } = useUserStore();

    const handleLogin = () => {
        // ensure user and password are set
        if (username && password) {
            loginUser(username, password, (code, data) => {
                if (code === 200) {
                    setUserData({ user: data.userName, token: data.accessToken });
                    setErrorMessage("");
                } else {
                    setErrorMessage("Login failed. Please try again.");
                }
                setUsername("");
                setPassword("");
            });
        }
    };

    return (
        <div>
            <div className="welcome-message">
                <span className="error-message">{errorMessage}</span>
                {userData ? (
                    <>
                        <span>Welcome, {userData.user}!</span>
                        <button onClick={() => clearUserData()}>Logout</button>
                    </>
                ) : (
                    <>
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button onClick={handleLogin}>Login</button>
                    </>
                )}
            </div>
        </div>
    );
};
