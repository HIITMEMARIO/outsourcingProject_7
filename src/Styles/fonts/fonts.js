import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './Styles/globalStyles';
import GlobalFonts from './Styles/fonts/fonts'; //4-1

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalFonts />
    <Routes />
    ...
  </React.StrictMode>,
  document.getElementById('root'),
);

const StLogoBox = styled.div`
  font-family: 'MontHeavyDemo'; //4-3
`;
