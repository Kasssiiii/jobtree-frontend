import React from 'react';
import './Posting.css';
import { useDraggable } from '@dnd-kit/core';
import { Link } from 'react-router';

export const Posting = ({ post }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: post._id,
    });
    const style = transform
        ? {
            transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
        : undefined;

    return (
            <div style={style} className='posting' key={post._id} ref={setNodeRef} {...attributes} {...listeners}>
                <h4>{post.jobTitle}</h4>
                <p>{post.company}</p>
                <Link to={`/postings/${post._id}`} style={{ fontSize: '0.9em', marginTop: '8px', display: 'inline-block', background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>Details</Link>
            </div>
    );
};