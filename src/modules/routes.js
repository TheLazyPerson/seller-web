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
import EditBankDetails from "./pages/profileDetails/editBankDetails";
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
import SubscriptionPage from "./pages/subscriptionPage";
import YourExhibitionListingPage from "./pages/yourExhibitionListingPage";
import AddProduct from "./pages/productsPage/addProduct";
import EditProduct from "./pages/productsPage/editProduct";
import OrderDetailsPage from "./pages/orderDetailsPage";
import TransactionDetailsPage from "./pages/salesPage/transactionDetailPage";
import ExhibitionSubscriptionOverviewPage from "./pages/exhibitionSuscriptionOverviewPage";
import ProductDetailsPage from "./pages/productDetailsPage";
import ForgotPassword from "./pages/forgetPassword";
import RestPassword from "./pages/resetPassword";
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
        path="/reset-password/:token?"
        component={RestPassword}
        validator={() => !isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/forgot-password"
        component={ForgotPassword}
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
        path="/exhibition/subscribe/:exhibitionId?"
        redirectTo="signin"
        component={ExhibitionSubscriptionOverviewPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/order/details/:orderId?"
        component={OrderDetailsPage}
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
        path="/product/add"
        component={AddProduct}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/product/details/:productId?"
        component={ProductDetailsPage}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/product/edit/:productId?"
        component={EditProduct}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/sales"
        redirectTo="signin"
        component={SalesPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/sales/details/:transactionId?"
        component={TransactionDetailsPage}
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
        path="/profile/details/edit-bank-details"
        component={EditBankDetails}
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
        path="/subscription"
        component={SubscriptionPage}
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
