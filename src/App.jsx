import React, { useState } from 'react';
import { LoginBar } from './components/LoginBar';
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
          <div>Your recent postings:</div>
          <PostList tick={tick} user={userData} refresh={refresh} />
        </>
      ) : (
        <h1>Please log in.</h1>
      )}
    </>
  )
}
