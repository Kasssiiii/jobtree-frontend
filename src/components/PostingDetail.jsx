import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getPostingById, getContacts, updatePosting, deletePosting, postingLanes } from '../jobTreeApi';
import { useUserStore } from '../userStore';
import { NavBar } from './NavBar';

import './PostingDetail.css';
import { NetworkingEntry } from './NetworkingEntry';

export const PostingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useUserStore();
    const [posting, setPosting] = useState(null);
    const [networkingEntries, setNetworkingEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ jobTitle: '', company: '', stage: '' });

    useEffect(() => {
        if (!userData || !userData.token) return;
        setLoading(true);
        getPostingById(id, userData.token, (status, data) => {
            if (status === 200 && data) {
                setPosting(data);
                setForm({ jobTitle: data.jobTitle, company: data.company, stage: data.stage });
                getContacts(userData.token, (cStatus, cData) => {
                    if (cStatus === 200 && Array.isArray(cData)) {
                        setNetworkingEntries(cData.filter(entry => entry.company === data.company));
                    } else {
                        setNetworkingEntries([]);
                    }
                    setLoading(false);
                });
            } else {
                setError('Failed to fetch posting.');
                setLoading(false);
            }
        });
    }, [id, userData]);


    if (!userData) {
        navigate('/');
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!posting) return <div>Posting not found.</div>;

    const handleEdit = () => setEditMode(true);
    const handleCancel = () => {
        setEditMode(false);
        setForm({ jobTitle: posting.jobTitle, company: posting.company, stage: posting.stage });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        updatePosting(id, form.jobTitle, form.company, form.stage, userData.token, (status, data) => {
            if (status === 200) {
                setPosting(data);
                setEditMode(false);
                setLoading(false);
            } else {
                setError('Failed to update posting.');
                setLoading(false);
            }
        });
    };
    const handleDelete = () => {
        setLoading(true);
        deletePosting(id, userData.token, (status) => {
            if (status === 200) {
                navigate('/');
            } else {
                setError('Failed to delete posting.');
                setLoading(false);
            }
        });
    };

    return (
        <>
            <NavBar />
            <div className="posting-detail-container">
                <h2>Posting Details</h2>
                {editMode ? (
                    <form onSubmit={handleSave} style={{ marginBottom: '1rem' }}>
                        <div>
                            <label>Job Title: </label>
                            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Company: </label>
                            <input name="company" value={form.company} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Stage: </label>
                            <select name="stage" value={form.stage} onChange={handleChange} required>
                                {postingLanes.map(lane => (
                                    <option key={lane} value={lane}>{lane.charAt(0).toUpperCase() + lane.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={loading}>Save</button>
                        <button type="button" onClick={handleCancel} disabled={loading} >Cancel</button>
                    </form>
                ) : (
                    <>
                        <div><strong>Job Title:</strong> {posting.jobTitle}</div>
                        <div><strong>Company:</strong> {posting.company}</div>
                        <div><strong>Stage:</strong> {posting.stage}</div>
                        <button onClick={handleEdit} style={{ marginRight: '1rem' }}>Edit</button>
                        <button onClick={handleDelete} style={{ background: '#e57373', color: '#fff' }}>Delete</button>
                    </>
                )}
                <h3>Networking Entries for {posting.company}</h3>
                {networkingEntries.length === 0 ? (
                    <div>No networking entries for this company.</div>
                ) : (
                    <div>
                        {networkingEntries.map(entry => (
                            <NetworkingEntry key={entry._id} contact={entry} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
