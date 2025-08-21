import React from 'react';
import './Posting.css'
import { useDraggable } from '@dnd-kit/core';

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
        </div>
    );
};