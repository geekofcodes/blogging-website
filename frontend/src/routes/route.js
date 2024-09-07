import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import UploadPage from '../pages/posts/upload';
import HomePage from '../pages/home';
import ViewPage from '../pages/posts/view';
import Navbar from '../components/navbar';
import AboutPage from '../pages/about';
import Footer from '../components/footer';
import EditPage from '../pages/posts/edit'

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
            <Route path="/edit/:postId">
              <EditPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        <Footer />
    </React.Fragment>

  );
};

export default Routes;
