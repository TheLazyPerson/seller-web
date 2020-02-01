import React from "react";
import { Switch, Route } from "react-router-dom";

import PageNotFound from "CommonComponents/pageNotFound";

import topContainerHoc from "Hoc/topContainerHoc";
import ProtectedRoute from "CommonContainers/protectedRoute";
import { connect } from "react-redux";

const App = ({ isUserSignedIn }) => {
  return (
    <Switch>
      <Route component={PageNotFound} />
    </Switch>
  );
};

const mapStateToProps = state => {
  return {
    isUserSignedIn: state.signInReducer.isUserSignedIn
  };
};

export default connect(mapStateToProps, null)(App);
