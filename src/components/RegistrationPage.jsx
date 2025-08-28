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
        <>
            <div className="registration-bg"></div>
            <div className="registration-layout">
                <div className="registration-info">
                    <img src="/jobtree.png" alt="JobTree Logo" className="registration-logo" />
                    <div className="registration-blurb">
                        <h1>Welcome to JobTree!</h1>
                        <p>Your all-in-one platform for tracking job applications, networking, and landing your dream job.</p>
                        <p>Job Tree helps job seekers stay organized during their job search by providing a comprehensive
                            tracking system for all applications and networking connections. Instead of juggling spreadsheets,
                            sticky notes, and scattered emails, users get one centralized platform to monitor application statuses,
                            track networking contacts, and visualize their job search progress. The app transforms the chaotic
                            job hunting process into an organized, tree-like structure where every opportunity and connection
                            has its place. Job Tree empowers users to never miss a follow-up, lose track of an application, or
                            forget a valuable networking contact again.</p>
                        <p>Join our community and take control of your career journey today!</p>
                    </div>
                </div>
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
            </div>
        </>
    );
};