import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Container } from '@material-ui/core';

import Header from './components/header';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CreatePost from './pages/createPost';
import ListPosts from './pages/listPosts';

const App: FC = () => {
  return (
    <>
      <Router>
        <Header/>
          <Switch>
            <Route path="/create" component={CreatePost}/>
            <Route exact path="/" component={ListPosts}/>
          </Switch>
      </Router>
    </>
  );
}


export default App;
