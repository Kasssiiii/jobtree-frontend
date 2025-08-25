import React from 'react';
import './NetworkingEntry.css';

export const NetworkingEntry = ({ contact, onEdit, onDelete }) => (
  <div className="networking-entry">
    <strong>{contact.name}</strong> @ {contact.company}
    <div><em>{contact.notes}</em></div>
    {(onEdit || onDelete) && (
      <div>
        {onEdit && <button onClick={() => onEdit(contact)}>Edit</button>}
        {onDelete && <button onClick={() => onDelete(contact._id)}>Delete</button>}
      </div>
    )}
  </div>
);
