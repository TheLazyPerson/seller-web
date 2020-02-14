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
import ProfileDetails from "./pages/profileDetails";
import Settings from "./pages/settings";
import HelpCenter from "./pages/helpCenter";
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
      <ProtectedRoute
        exact
        path="/marketplace"
        component={MarketPlace}
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/profile/details"
        component={ProfileDetails}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      {/* <ProtectedRoute
        exact
        path="/profile/details/change-password"
        component={ChangePassword}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/profile/details/edit-profile"
        component={EditProfile}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      /> */}
      <ProtectedRoute
        exact
        path="/profile/helpcenter"
        component={HelpCenter}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/profile/settings"
        component={Settings}
        redirectTo="signin"
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
