import React, { useState } from 'react';
import { LoginBar } from './components/LoginBar';
import { NewPostingForm } from './components/NewPostingForm';
import { PostList } from './components/PostList';

export const App = () => {
  const [userData, setUserData] = useState(null);
  const [tick, tock] = useState(false);
  const refresh = () => {
    tock(!tick);
  };

  return (
    <>
      <LoginBar setUserData={setUserData} userData={userData} />
      {userData ? (
        <>
          <div>Welcome back, {userData.name}!</div>
          <NewPostingForm user={userData} refresh={refresh} />
          <div>Your recent postings:</div>
          <PostList tick={tick} user={userData} />
        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </>
  )
}
