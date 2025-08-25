import React, { useState } from 'react';

export const RegistrationPage = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

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
        // Submit logic here
        alert('Registration successful!');
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>
                <div>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.confirmPassword && (
                        <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
                    )}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};