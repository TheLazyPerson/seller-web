import React from "react";
import { Switch, Route } from "react-router-dom";

import PageNotFound from "CommonComponents/pageNotFound";
import LandingPage from "./pages/landingPage";
import HomePage from './pages/homePage';

import topContainerHoc from "Hoc/topContainerHoc";
import ProtectedRoute from "CommonContainers/protectedRoute";
import SignInPage from './pages/signinPage';
import SignUpPage from './pages/signupPage';
import { connect } from "react-redux";

const App = ({ isUserSignedIn }) => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute
        exact
        path="/signin"
        component={SignInPage}
        validator={() => !isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/signup"
        component={SignUpPage}
        validator={() => !isUserSignedIn}
      />
      <Route component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    isUserSignedIn: false,//state.signInReducer.isUserSignedIn
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
