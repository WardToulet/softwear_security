import React, { FC  } from 'react';

import { Popover, Box, AppBar, Toolbar, IconButton, Typography, Avatar, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

const userAvatar = (user: any) => {
  if(user.picture) {
    return (
      <Avatar
        src={user.picture}
        alt={`${user.given_name} ${user.family_name}`}
      />
    );
  } else {
    return (
      <Avatar
        alt={`${user.given_name} ${user.family_name}`}
      >
        {user.given_name.charAt(0).toUpperCase()}{user.family_name.charAt(0).toUpperCase()}
      </Avatar>
    );
  }
}

const Header: FC = () => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon/>
          </IconButton>
          <Typography></Typography>
        </Box>

        {
          isAuthenticated
            ? userAvatar(user)
            : <Button color="inherit" onClick={loginWithRedirect}>Login</Button>
        }

        { isAuthenticated ? console.log(user) : '' } 
      </Toolbar>
    </AppBar>
  )
};

export default Header;
