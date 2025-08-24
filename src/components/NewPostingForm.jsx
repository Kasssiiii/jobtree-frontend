import React, { useState } from 'react';
import { sendPosting } from '../api';

export const NewPostingForm = ({  user, refresh, setPosts }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendPosting(title, company, user.token, (code, body) => {
            if (code === 200) {
                setTitle('');
                setCompany('');
                setError('');
                setPosts(posts => [body, ...posts]);
            } else {
                setError('Failed to create posting.');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};