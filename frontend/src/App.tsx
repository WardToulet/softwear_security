import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const App: FC = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <>
      { isLoading && 'Loading' }
      { error && console.error(error) }
      { 
        isAuthenticated
          ? <>
            Hello { user.name }
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </button>
          </>    
          : <>
            <button onClick={loginWithRedirect}>Login</button>
          </>
      }
    </>
  );
}


export default App;
