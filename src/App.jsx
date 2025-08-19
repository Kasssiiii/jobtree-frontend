import React, { useState } from 'react';
import { LoginBar } from './components/LoginBar';

export const App = () => {
const [userData, setUserData] = useState(null);

  return (
    <>
      <LoginBar setUserData={setUserData} userData={userData}/>
    </>
  )
}
