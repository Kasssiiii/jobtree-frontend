import React from 'react';
import './Posting.css'

export const Posting = ({ post }) => {
    return (
        <div className='posting' key={post._id}>
            <h4>{post.jobTitle}</h4>
            <p>{post.company}</p>
        </div>
    );
};