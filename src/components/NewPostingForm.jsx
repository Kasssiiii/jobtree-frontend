import React, { useState } from 'react';
import { sendPosting } from '../jobTreeApi';
import { useUserStore } from '../userStore';
import './NewPostingForm.css';

export const NewPostingForm = ({ setPosts }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const { userData } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendPosting(title, company, userData.token, (code, body) => {
            if (code === 200) {
                setTitle('');
                setCompany('');
                setError('');
                setPosts({ action: 'add', posting: body });
            } else {
                setError('Failed to create posting.');
            }
        });
    };

    return (
        <form className="new-posting-form" onSubmit={handleSubmit}>
            <div>
                <label>
                    Job Title:
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Company:
                    <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        required
                    />
                </label>
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">
                Add
            </button>
        </form>
    );
};