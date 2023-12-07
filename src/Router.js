import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import Layout from 'Layout/Layout';
import MyPage from 'pages/MyPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage/:id" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
