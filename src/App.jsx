import React, { useState } from 'react';
import { LoginBar } from './components/LoginBar';
import { PostList } from './components/PostList';
import { BrowserRouter, Route, Routes } from "react-router";
import { PostingDetail } from './components/PostingDetail';
import { RegistrationPage } from './components/RegistrationPage';
import { Networking } from './components/Networking';

export const App = () => {
  return (
    <>
      <LoginBar />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/welcome" element={<RegistrationPage />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/postings/:id" element={<PostingDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
