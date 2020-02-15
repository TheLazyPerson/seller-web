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
import ChangePassword from "./pages/profileDetails/changePassword";
import EditProfile from "./pages/profileDetails/editProfile";
import EditMarketplaceProfile from "./pages/marketPlace/editMarketplaceProfile";
import ProfileAddress from "./pages/address";
import AddAddress from "./pages/address/addAddress";
import EditAddress from "./pages/address/editAddress";
import TermsAndConditionPage from "./pages/termsAndConditionPage";
import PrivacyPolicyPage from "./pages/privacyPolicyPage";
import FAQPage from "./pages/FAQPage";
import OrdersPage from "./pages/ordersPage";
import ProductsPage from "./pages/productsPage";
import SalesPage from "./pages/salesPage";
import YourExhibitionListingPage from "./pages/yourExhibitionListingPage";
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
        redirectTo="signin"
        component={ExhibitionListingPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/exhibition/details/:exhibitionId?"
        component={ExhibitionDetailsPage}
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/exhibition/enrolled"
        redirectTo="signin"
        component={YourExhibitionListingPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/orders"
        component={OrdersPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/products"
        component={ProductsPage}
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/sales"
        component={SalesPage}
        validator={() => isUserSignedIn}
      />
      <Route
        exact
        path="/marketplace"
        redirectTo="signin"
        component={MarketPlace}
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/marketplace/edit-marketplace-profile"
        component={EditMarketplaceProfile}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/profile/details"
        component={ProfileDetails}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
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
      />

      <ProtectedRoute
        exact
        path="/profile/address"
        component={ProfileAddress}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/profile/address/add"
        component={AddAddress}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/profile/address/edit"
        component={EditAddress}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
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
      <Route
        exact
        path="/terms-and-condition"
        component={TermsAndConditionPage}
      />

      <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route exact path="/faq" component={FAQPage} />

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
