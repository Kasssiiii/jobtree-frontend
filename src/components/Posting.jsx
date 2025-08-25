import React from 'react';
import './Posting.css';
import { useDraggable } from '@dnd-kit/core';
import { Link } from 'react-router';

export const Posting = ({ post }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: post._id,
    });
    const style = {
        ...(transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {}),
        ...(isDragging ? { zIndex: 1000, boxShadow: '0 4px 24px rgba(0,0,0,0.58)' } : {}),
        position: 'relative',
    };

    return (
        <div style={style} className='posting' key={post._id} ref={setNodeRef} {...attributes} {...listeners}>
            <h4>{post.jobTitle}</h4>
            <p>{post.company}</p>
            <Link to={`/postings/${post._id}`} className="details-link" style={isDragging ? { zIndex: 1 } : {}}>
                Details
            </Link>
        </div>
    );
};