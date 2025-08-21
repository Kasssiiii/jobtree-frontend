import React from 'react';
import { Posting } from './Posting';
import './Lane.css';

export const Lane = ({ lane, posts }) => {
    return (
        <div className='lane'>
            <h3>{lane}</h3>
            {posts.map(post => (
                <Posting key={post._id} post={post} />
            ))}
        </div>
    )
};