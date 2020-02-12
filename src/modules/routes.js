import React from "react";
import { Switch, Route } from "react-router-dom";

import PageNotFound from "CommonComponents/pageNotFound";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homePage";
import MarketPlace from "./pages/marketPlace";

import topContainerHoc from "Hoc/topContainerHoc";
import ProtectedRoute from "CommonContainers/protectedRoute";
import SignInPage from "./pages/signinPage";
import SignUpPage from "./pages/signupPage";
import ExhibitionListingPage from "./pages/exhibitionListingPage";
import ExhibitionDetailsPage from "./pages/exhibitionDetailsPage";
import { connect } from "react-redux";

const App = ({ isUserSignedIn }) => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute
        exact
        path="/home"
        component={HomePage}
        validator={() => isUserSignedIn}
      />
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
      <ProtectedRoute
        exact
        path="/exhibitions"
        component={ExhibitionListingPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/exhibition-details/:exhibitionId?"
        component={ExhibitionDetailsPage}
        validator={() => isUserSignedIn}
      />
      <Route
        exact
        path="/marketplace"
        component={MarketPlace}
        validator={() => isUserSignedIn}
      />
      <Route component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    isUserSignedIn: state.signInReducer.isUserSignedIn
  };
};

export default connect(mapStateToProps, null)(topContainerHoc(App));
