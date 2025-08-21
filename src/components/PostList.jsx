import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../api';
import { Lane } from './Lane';
import './PostList.css';

export const PostList = ({ user, tick }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getUserPosts(user.token, (code, body) => {
            if (code === 200) {
                setPosts(body);
                setError(null);
            } else {
                setError('Failed to fetch posts.');
            }
            setLoading(false);
        });
    }, [tick]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (posts.length === 0) return <div>No posts found.</div>;

    const postingLanes = ["applied", "interview", "offer", "rejected"];

    // return four Lane components each getting their respective posts
    return (
        <div className='post-list'>
            {postingLanes.map(lane => (
                <Lane key={lane} lane={lane} posts={posts.filter(post => post.stage === lane)} />
            ))}
        </div>
    );
};