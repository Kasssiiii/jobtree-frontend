import React, {useEffect} from 'react';
import { useUserStore } from '../userStore';
import { RegistrationPage } from './RegistrationPage';
import { NavBar } from './NavBar';
import { getContacts, addContact, updateContact, deleteContact } from '../api';

export const Networking = () => {
    const { userData } = useUserStore();
    const [contacts, setContacts] = React.useState([]);
    const [form, setForm] = React.useState({ name: '', company: '', notes: '' });
    const [editId, setEditId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        if (!userData || !userData.token) return;
        setLoading(true);
        getContacts(userData.token, (status, data) => {
            setLoading(false);
            if (status === 200) {
                setContacts(data);
            } else {
                setError(data.error || 'Failed to fetch contacts');
            }
        });
    }, [userData]);

    if (!userData) {
        return <RegistrationPage />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (editId !== null) {
            updateContact(editId, form, userData.token, (status, data) => {
                setLoading(false);
                if (status === 200) {
                    setContacts((prev) => prev.map((c) => c._id === editId ? data : c));
                    setEditId(null);
                    setForm({ name: '', company: '', notes: '' });
                } else {
                    setError(data.error || 'Failed to update contact');
                }
            });
        } else {
            addContact(form, userData.token, (status, data) => {
                setLoading(false);
                if (status === 200) {
                    setContacts((prev) => [...prev, data]);
                    setForm({ name: '', company: '', notes: '' });
                } else {
                    setError(data.error || 'Failed to add contact');
                }
            });
        }
    };

    const handleEdit = (contact) => {
        setForm({ name: contact.name, company: contact.company, notes: contact.notes });
        setEditId(contact._id);
    };

    const handleDelete = (id) => {
        setLoading(true);
        setError(null);
        deleteContact(id, userData.token, (status, data) => {
            setLoading(false);
            if (status === 200) {
                setContacts((prev) => prev.filter((c) => c._id !== id));
                if (editId === id) {
                    setForm({ name: '', company: '', notes: '' });
                    setEditId(null);
                }
            } else {
                setError(data.error || 'Failed to delete contact');
            }
        });
    };

    return (
        <>
            <NavBar />
            <div>
                <h1>Networking Page</h1>
                <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                    <div>
                        <label>Name: </label>
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Company: </label>
                        <input name="company" value={form.company} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Notes: </label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={5} />
                    </div>
                    <button type="submit" disabled={loading}>{editId !== null ? 'Update Contact' : 'Add Contact'}</button>
                </form>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <h2>Contacts</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : contacts.length === 0 ? (
                    <p>No contacts added yet.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {contacts.map((contact) => (
                            <li key={contact._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
                                <strong>{contact.name}</strong> @ {contact.company}
                                <div><em>{contact.notes}</em></div>
                                <button onClick={() => handleEdit(contact)} style={{ marginRight: '1rem' }}>Edit</button>
                                <button onClick={() => handleDelete(contact._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};