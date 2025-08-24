import React from 'react';
import { Posting } from './Posting';
import './Lane.css';
import { useDroppable } from '@dnd-kit/core';
import { NewPostingForm } from './NewPostingForm';

export const Lane = ({ lane, posts, userData, refresh }) => {
    const { setNodeRef } = useDroppable({
        id: lane,
    });

    return (
        <div ref={setNodeRef} className='lane'>
            <h3>{lane.charAt(0).toUpperCase() + lane.slice(1)}</h3>
            {(lane === "applied") && <NewPostingForm user={userData} refresh={refresh} />}

            {posts.map(post => (
                <Posting key={post._id} post={post} />
            ))}
        </div>
    )
};