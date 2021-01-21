import React, { FC } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const MyAuth0Provider: FC = ({
  children
}) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
  console.log(process.env.TEST);

  console.info(`Domain: ${domain}`, `Client id: ${clientId}`);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      { children } 
    </Auth0Provider>
  )
}

export default MyAuth0Provider;
