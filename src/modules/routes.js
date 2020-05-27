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
import ResetPassword from "./pages/resetPassword";
import ResetPasswordSuccess from "./pages/resetPassword/resetPasswordSucess";
import { connect } from "react-redux";
import MarketplaceDetail from "./pages/marketplaceDetails";
import BankDetails from "./pages/bankDetailsPage";
import LocationDetails from "./pages/locationDetailsPage";
import resetPassword from "./pages/resetPassword";
import SubscriptionPaymentSuccessPage from "./pages/subscriptionPaymentSuccessPage";
import SubscriptionPaymentFailurePage from "./pages/subscriptionPaymentFailurePage";
import ProfileSubscriptionPaymentSuccessPage from "./pages/subscriptionPage/profileSubscriptionPaymentSuccessPage";
import ProfileSubscriptionPaymentFailurePage from "./pages/subscriptionPage/profileSubscriptionPaymentFailurePage";
import MainOrdersDetailsPage from "./pages/mainOrdersShippingPage";
import OrderShippingInformationPage from "./pages/ordersShippingInfomationPage";
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
        path="/profile/orders/details/:orderId?"
        component={OrderDetailsPage}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/orders/shipping/information/:orderId?"
        component={MainOrdersDetailsPage}
        validator={() => isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/profile/orders/shipping/:orderId?"
        component={OrderShippingInformationPage}
        redirectTo="signin"
        validator={() => isUserSignedIn}
      />
      <Route
        exact
        path="/signup/subscription/payment/success"
        component={SubscriptionPaymentSuccessPage}
      />
      <Route
        exact
        path="/signup/subscription/payment/failure"
        component={SubscriptionPaymentFailurePage}
      />
      <Route
        exact
        path="/profile/subscription/payment/success"
        component={ProfileSubscriptionPaymentSuccessPage}
      />
      <Route
        exact
        path="/profile/subscription/payment/failure"
        component={ProfileSubscriptionPaymentFailurePage}
      />
      <ProtectedRoute
        exact
        path="/marketplace-details"
        component={MarketplaceDetail}
        validator={() => !isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/bank-details"
        component={BankDetails}
        validator={() => !isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/location-details"
        component={LocationDetails}
        validator={() => !isUserSignedIn}
      />
      <ProtectedRoute
        exact
        path="/reset-password/:token?"
        component={resetPassword}
        validator={() => !isUserSignedIn}
      />

      <ProtectedRoute
        exact
        path="/reset-password-sucess"
        component={ResetPasswordSuccess}
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
      <ProtectedRoute
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

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.signInReducer.isUserSignedIn,
  };
};

export default connect(mapStateToProps, null)(topContainerHoc(App));
