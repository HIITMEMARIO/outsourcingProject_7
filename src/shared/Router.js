import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import Layout from 'Layout/Layout';
import MyPage from 'pages/MyPage';
import { useSelector } from 'react-redux';

export default function Router() {
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {isLogin ? (
            <>
              <Route path="/mypage" element={<MyPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/mypage/:id"
                element={<Navigate replace to="/login" />}
              />
            </>
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
