import React, {useEffect} from 'react';
import { useUserStore } from '../userStore';
import { RegistrationPage } from './RegistrationPage';
import { NavBar } from './NavBar';
import { getContacts, addContact, updateContact, deleteContact, getUserPosts } from '../jobTreeApi';

import './Networking.css';
import { NetworkingEntry } from './NetworkingEntry';

export const Networking = () => {
    const { userData } = useUserStore();
    const [contacts, setContacts] = React.useState([]);
    const [form, setForm] = React.useState({ name: '', company: '', notes: '' });
    const [editId, setEditId] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [companies, setCompanies] = React.useState([]);

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
        // Fetch user's postings to get companies
        getUserPosts(userData.token, (status, data) => {
            if (status === 200 && Array.isArray(data)) {
                // Extract unique companies
                const uniqueCompanies = [...new Set(data.map(post => post.company).filter(Boolean))];
                setCompanies(uniqueCompanies);
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
            <div className="networking-page">
                <form onSubmit={handleSubmit}>
                    <div className="networking-form-row">
                        <div>
                            <label htmlFor="networking-name">Name: </label>
                            <input id="networking-name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="networking-company">Company: </label>
                            <input
                                id="networking-company"
                                name="company"
                                list="company-list"
                                value={form.company}
                                onChange={handleChange}
                                required
                                placeholder="Type or select company"
                            />
                            <datalist id="company-list">
                                {companies.map((company) => (
                                    <option key={company} value={company} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <div className="networking-notes-row">
                        <label htmlFor="networking-notes">Notes: </label>
                        <textarea id="networking-notes" name="notes" value={form.notes} onChange={handleChange} rows={5} />
                    </div>
                    <button type="submit" disabled={loading}>{editId !== null ? 'Update Contact' : 'Add Contact'}</button>
                </form>
                {error && <div className="error">{error}</div>}
                <h1>Your Contacts</h1>
                <div className="networking-contacts-section">
                  {loading ? (
                      <p>Loading...</p>
                  ) : contacts.length === 0 ? (
                      <p>No contacts added yet.</p>
                  ) : (
                      <div className="networking-contacts-grid">
                          {contacts.map((contact) => (
                              <NetworkingEntry
                                  key={contact._id}
                                  contact={contact}
                                  onEdit={handleEdit}
                                  onDelete={handleDelete}
                              />
                          ))}
                      </div>
                  )}
                </div>
            </div>
        </>
    );
};