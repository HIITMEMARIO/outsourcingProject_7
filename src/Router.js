import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import MainPage from 'pages/MainPage';
import MyPage from 'pages/MyPage';
import LoginPage from 'pages/LoginPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
