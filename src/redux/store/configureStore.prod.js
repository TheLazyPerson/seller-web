// @flow
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import rootReducer from "../reducers";
import { apiMiddleware } from "redux-api-middleware";
import apiAuthInjector from "../../seller-core/middleware/authInjector";
import apiErrorHandler from "../../seller-core/middleware/apiError";
import loaderMiddleware from "../middleware/loaderMiddleware";
import userErrorMiddleware from "../middleware/userErrorMiddleware";

const history = createBrowserHistory();
const enhancer = applyMiddleware(
  thunk,
  apiAuthInjector,
  apiMiddleware,
  apiErrorHandler,
  loaderMiddleware,
  userErrorMiddleware
);

function configureStore(initialState) {
  return createStore(rootReducer(history), initialState, enhancer);
}

export default { configureStore, history };
