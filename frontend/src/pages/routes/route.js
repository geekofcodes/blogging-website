import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import UploadPage from '../upload';
import HomePage from '../home';
import ViewPage from '../view';
import Navbar from '../../components/navbar';
import AboutPage from '../about';

const Routes = () => {
  return (
    <React.Fragment>
        <Navbar />
          <Switch>
            <Route path="/upload">
              <UploadPage />
            </Route>
            <Route path="/view/:postId">
              <ViewPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
    </React.Fragment>

  );
};

export default Routes;
