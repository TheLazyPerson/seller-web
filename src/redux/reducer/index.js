import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import loaderReducer from "./loaderReducer";
import flashMessageReducer from "./flashMessageReducer";
import signInReducer from "Core/modules/signin/signinReducer";
import signUpReducer from "Core/modules/signup/signupReducer";
import profileDetailsReducer from "Core/modules/profiledetails/profileDetailsReducer";
import addressReducer from "Core/modules/address/addressReducer";
import basicReducer from "Core/modules/basic/basicReducer";

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
    loaderReducer,
    flashMessageReducer,
    signInReducer,
    signUpReducer,
    profileDetailsReducer,
    addressReducer,
    basicReducer
  });

/* const rootReducer = ( state, action ) => {
  if ( action.type === "LOGOUT_SUCCESS" ) {
    state = undefined;
  }

  return appReducer(state, action)
 } */

export default appReducer;
