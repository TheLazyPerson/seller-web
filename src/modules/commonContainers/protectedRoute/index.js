import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import navigatorHoc from 'Hoc/navigatorHoc';

const ProtectedRoute = ({
  component: Component,
  replaceTo, // its a function which navigates to new screen
  validator, // condition in which it should remain on the page
  redirectTo, // its a string where it needs to navigate if present
  ...rest
}) => (

  <Route
    {...rest}
    render={(props) => {
      if (validator()) return <Component {...props} />;

      if(redirectTo) return replaceTo(redirectTo);

      replaceTo();
      /* Using the <Redirect> component causing the
       next redirect page to render an empty page */
      return null;
    }}
  />
);

ProtectedRoute.propTypes = {
  validator: PropTypes.func.isRequired,
  replaceTo: PropTypes.func.isRequired,
};

export default navigatorHoc(ProtectedRoute);
