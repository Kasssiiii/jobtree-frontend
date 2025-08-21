import React from 'react';
import { Posting } from './Posting';
import './Lane.css';
import { useDroppable } from '@dnd-kit/core';

export const Lane = ({ lane, posts }) => {
    const { setNodeRef } = useDroppable({
        id: lane,
    });

    return (
        <div ref={setNodeRef} className='lane'>
            <h3>{lane.charAt(0).toUpperCase() + lane.slice(1)}</h3>
            {posts.map(post => (
                <Posting key={post._id} post={post} />
            ))}
        </div>
    )
};