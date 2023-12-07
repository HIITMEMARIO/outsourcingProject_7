import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import Layout from 'Layout/Layout';
import MyPage from 'pages/MyPage';
import { useSelector } from 'react-redux';

export default function Router() {
  const isLogin = useSelector(state => state.authSlice.isLogin)
  console.log(isLogin)
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/**login과 my페이지는 isLogin 상태에 따라 조건부 라우팅
           * true = mypage, false = loginpage
           */}
          {isLogin ?
            <>
              <Route path="/mypage" element={<MyPage />} />
            </>
            :
            <Route path="/login" element={<LoginPage />} />
          }
          <Route path="*" element={<Navigate replace to="/" />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
