import React, { useState } from 'react';
import { LoginBar } from './components/LoginBar';
import { PostList } from './components/PostList';
import { useUserStore } from './userStore';

export const App = () => {
  const { userData } = useUserStore();

  return (
    <>
      <LoginBar />
      {userData ? (
        <>
          <div>Your recent postings:</div>
          <PostList />
        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </>
  )
}
