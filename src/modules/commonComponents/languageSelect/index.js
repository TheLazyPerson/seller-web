import React, { Component } from "react";
import styles from "./language_select.module.scss";
import DivRow from "CommonComponents/divRow";
import { withTranslation } from "react-i18next";
import { LANG } from "Constants/cookieConstants";
import { CookieService } from "Utils/cookieService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { setLanguageAction } from "Core/modules/language/languageActions";

class LanguageSelect extends Component {
  changeLanguage = (languageCode) => {
    const { i18n } = this.props;
    // setLanguageAction

    i18n.changeLanguage(languageCode);
    // setLanguageAction(languageCode);
    CookieService.set(LANG, languageCode);
  };

  render() {
    const {
      blackColor,
      // languageReducer: { languageCode }
    } = this.props;
    const arSelected = false; //languageCode === "ar";
    const enSelected = true; //languageCode === "en";

    return (
      <DivRow
        className={`${blackColor ? styles.black : styles.white}`}
        verticalCenter
      >
        <span
          className={`${styles.language_item_text} ${
            !enSelected ? styles.not_selected : ""
          }`}
          onClick={() => this.changeLanguage("en")}
        >
          En
        </span>
        &nbsp;&nbsp;
        <span className={styles.divider}>/</span>&nbsp;&nbsp;
        <span
          className={`${styles.language_item_text} ${
            !arSelected ? styles.not_selected : ""
          }`}
          onClick={() => this.changeLanguage("ar")}
        >
          العربي
        </span>
      </DivRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(withTranslation()(LanguageSelect));
