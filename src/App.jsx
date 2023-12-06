import GlobalStyles from 'GlobalStyle';
import React, { useEffect } from 'react';
import Router from 'shared/Router';

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
