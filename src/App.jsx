import GlobalStyles from 'GlobalStyle';
import React from 'react';
import Router from '../src/shared/Router';

export function App() {
  return (
    <div>
      <>
        <GlobalStyles />
        <Router />
      </>
    </div>
  );
}

export default App;
