import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { registerUser } from '../jobTreeApi';
import { useUserStore } from '../userStore';
import './RegistrationPage.css';

export const RegistrationPage = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { setUserData } = useUserStore();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.username) newErrors.username = 'Username is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        registerUser(form.username, form.password, form.email, (code, data) => {
            if (code === 200) {
                setUserData({ user: data.name, token: data.accessToken });
                setErrors({});
                setForm({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/");
            } else {
                setErrors({ general: "Registration failed. " + JSON.stringify(data.error) });
            }
        });
    };

    return (
        <div className="registration-page">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                />
                {errors.username && <div className="error">{errors.username}</div>}
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="error">{errors.password}</div>}
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                <button type="submit">Register</button>
                {errors.general && <div className="error">{errors.general}</div>}
            </form>
        </div>
    );
};