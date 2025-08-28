import React, { useEffect, useReducer, useState, useMemo } from 'react';
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
    const companies = useMemo(() => {
        return [...new Set(posts.map(post => post.company).filter(Boolean))];
    }, [posts]);

    

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
        const oldStageChange = posts.find(post => post._id === taskId)?.lastStageChange;

        setPosts({ action: 'setStage', _id: taskId, stage: newStage, lastStageChange: Date.now() });

        updatePosting(taskId, null, null, newStage, userData.token, (code, body) => {
            if (code === 200) {
                // API call successful, no need to revert
            } else {
                //API failed, now revert to old stage
                setPosts({ action: 'setStage', _id: taskId, stage: oldStage, lastStageChange: oldStageChange });
            }
        });
    }


    

    // return four Lane components each getting their respective posts, sorted by lastStageChange descending
    return (
        <>
            <NavBar />
            <div className='post-list'>
                <DndContext onDragEnd={handleDragEnd}>
                    {postingLanes.map(lane => {
                        const lanePosts = posts
                            .filter(post => post.stage === lane)
                            .sort((a, b) => {
                                const aTime = a.lastStageChange ? new Date(a.lastStageChange).getTime() : 0;
                                const bTime = b.lastStageChange ? new Date(b.lastStageChange).getTime() : 0;
                                return bTime - aTime;
                            });
                        return (
                            <Lane
                                key={lane}
                                lane={lane}
                                posts={lanePosts}
                                setPosts={setPosts}
                                allCompanies={companies}
                            />
                        );
                    })}
                </DndContext>
            </div>
        </>
    );
};