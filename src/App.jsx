import GlobalStyles from 'Styles/GlobalStyle';
import React from 'react';
import Router from '../src/shared/Router';
// import GlobalFonts from '../src/fonts/GlobalFonts';
export function App() {
  return (
    <div>
      <>
        <GlobalStyles />
        {/* <GlobalFonts /> */}
        <Router />
      </>
    </div>
  );
}

export default App;
