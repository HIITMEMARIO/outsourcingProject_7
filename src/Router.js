import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout/Layout';

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes></Routes>
      </Layout>
    </BrowserRouter>
  );
}
