import GlobalStyles from 'GlobalStyle';
import React, { useEffect } from 'react';
import { userStateChange } from 'config/firebase';
import { useLoggedIn } from 'hooks/useAuth';
import Router from 'Router';

export function App() {
  const { setLoginState } = useLoggedIn();

  useEffect(() => {
    userStateChange((user) => setLoginState(user));
  }, [setLoginState]);

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

