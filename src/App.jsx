import GlobalStyles from 'Styles/GlobalStyle';
import React from 'react';
import Router from '../src/shared/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function App() {
  return (
    <div>
      <>
        <GlobalStyles />
        <ToastContainer />
        <Router />
      </>
    </div>
  );
}

export default App;
