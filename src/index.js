import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore, history } from "./redux/store/configureStore.dev";
import "./index.css";
import App from "./modules/routes";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_ar from "./translations/ar/common.json";
import common_en from "./translations/en/common.json";
import { LANG } from "Constants/cookieConstants";
import { CookieService } from "Utils/cookieService";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
const languageCode = CookieService.getJSON(LANG);

let store = configureStore();

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: languageCode || "en",
  resources: {
    en: {
      common: common_en
    },
    ar: {
      common: common_ar
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <I18nextProvider i18n={i18next}>
        <ReactNotification />
        <App />
      </I18nextProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
