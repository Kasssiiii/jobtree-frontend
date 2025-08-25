import React, { useEffect, useReducer, useState } from 'react';
import { getUserPosts, updatePosting, postingLanes } from '../jobTreeApi';
import { postOps } from '../postingOps';
import { Lane } from './Lane';
import './PostList.css';
import { DndContext } from '@dnd-kit/core';
import { useUserStore } from '../userStore';
import { RegistrationPage } from './RegistrationPage';
import { NavBar } from './NavBar';

export const PostList = () => {
    const [posts, setPosts] = useReducer(postOps, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userData } = useUserStore();

    

    useEffect(() => {
        if (!userData) return;
        setLoading(true);
        setError(null);
        getUserPosts(userData.token, (code, body) => {
            if (code === 200) {
                setPosts({ action: 'set', postings: body });
                setError(null);
            } else {
                setError('Failed to fetch posts.');
            }
            setLoading(false);
        });
    }, [userData]);

    if (!userData) {
        return <RegistrationPage />;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    //not dropping if not over drop zone
    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;
        const taskId = active.id;
        const newStage = over.id;

        // fetch old stage
        const oldStage = posts.find(post => post._id === taskId)?.stage;

        setPosts({ action: 'setStage', _id: taskId, stage: newStage });

        updatePosting(taskId, null, null, newStage, userData.token, (code, body) => {
            if (code === 200) {
                // API call successful, no need to revert
            } else {
                //API failed, now revert to old stage
                setPosts({ action: 'setStage', _id: taskId, stage: oldStage });
            }
        });
    }


    

    // return four Lane components each getting their respective posts
    return (
        <>
            <NavBar />
            <div className='post-list'>
                <DndContext onDragEnd={handleDragEnd}>
                    {postingLanes.map(lane => (
                        <Lane key={lane} lane={lane} posts={posts.filter(post => post.stage === lane)} setPosts={setPosts} />
                    ))}
                </DndContext>
            </div>
        </>
    );
};