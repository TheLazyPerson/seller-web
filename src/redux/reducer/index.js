import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loaderReducer from "./loaderReducer";
import flashMessageReducer from "./flashMessageReducer";
import signInReducer from "Core/modules/signin/signinReducer";
import signUpReducer from "Core/modules/signup/signupReducer";
import profileDetailsReducer from "Core/modules/profiledetails/profileDetailsReducer";
import addressReducer from "Core/modules/address/addressReducer";
import basicReducer from "Core/modules/basic/basicReducer";
import marketplaceProfileReducer from "Core/modules/marketplaceprofile/marketplaceProfileReducer";
import subscriptionReducer from "Core/modules/subscription/subscriptionReducer";
import exhibitionReducer from "Core/modules/exhibition/exhibitionReducer";
import productReducer from "Core/modules/product/productReducer";
import orderReducer from "Core/modules/order/orderReducer";
import overviewReducer from "Core/modules/overview/overviewReducer";
import bankDetailsReducer from "Core/modules/bankDetails/bankDetailsReducer";
import resetPasswordReducer from "Core/modules/resetpassword/resetPasswordReducer";
import settingsReducer from "Core/modules/settings/settingsReducer";
import categoryReducer from "Core/modules/category/categoryReducer";

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    loaderReducer,
    flashMessageReducer,
    signInReducer,
    signUpReducer,
    profileDetailsReducer,
    marketplaceProfileReducer,
    addressReducer,
    basicReducer,
    subscriptionReducer,
    exhibitionReducer,
    productReducer,
    orderReducer,
    overviewReducer,
    bankDetailsReducer,
    resetPasswordReducer,
    settingsReducer,
    categoryReducer,
  });

/* const rootReducer = ( state, action ) => {
  if ( action.type === "LOGOUT_SUCCESS" ) {
    state = undefined;
  }

  return appReducer(state, action)
 } */

export default appReducer;
