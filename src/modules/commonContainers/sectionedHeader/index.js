import React, { Component } from "react";
import styles from "./sectioned_header.module.scss";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import searchIcon from "Icons/search-icon-black.svg";
import searchIconWhite from "Icons/search-icon-white.svg";
import hamburgerMenuIcon from "Icons/hamburger-menu-icon-black.svg";
import bagIcon from "Icons/cart-bag-icon-black.svg";
import bagIconWhite from "Icons/cart-bag-icon-white.svg";
import bookmarkIcon from "Icons/bookmark-icon-black.svg";
import bookmarkIconWhite from "Icons/bookmark-icon-white.svg";
import arrowDownIcon from "Icons/arrow-down-icon-black.svg";
import navigatorHoc from "Hoc/navigatorHoc";
import profileIconBlack from "Icons/profile-icon-black.svg";
import profileIconWhite from "Icons/profile-icon-white.svg";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import { searchTypes } from "Constants/searchConstants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import translatorHoc from "Hoc/translatorHoc";
import SearchBar from "../searchBar";
import { CookieService } from "Utils/cookieService";
import OverlayContainer from "./overlayContainer";
import { logoutAction } from "Core/modules/signin/signinActions";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import CapsuleButton from "CommonComponents/capsuleButton";

class SectionedHeader extends Component {
  clickedOnSearchItem = false;

  state = {
    searchText: "",
    showOverlayComponent: false
  };

  onClickProfile = () => {
    const { showOverlayComponent } = this.state;

    this.setState({
      showOverlayComponent: !showOverlayComponent
    });
  };

  onClickLogout = () => {
    const { logoutAction, navigateTo } = this.props;

    logoutAction().then(() => {
      CookieService.delete(USER_DATA_COOKIE);
      navigateTo(""); // ToHomePage
    });
  };

  onClickSignup = () => {
    const { navigateTo } = this.props;
    navigateTo("signup");
  };

  render() {
    const { isUserSignedIn, whiteColor, translate } = this.props;
    const { showOverlayComponent } = this.state;

    return (
      <DivRow className={styles.header_container}>
        <DivRow>
          {isUserSignedIn ? (
            <div
              style={{ height: "unset" }}
              className={`${styles.header_icon} ${styles.header_item_container} ${styles.profile_header_container}`}
            >
              <img
                className={styles.profile_pic}
                src={whiteColor ? profileIconWhite : profileIconBlack}
                onClick={this.onClickProfile}
              />
              <img
                src={arrowDownIcon}
                className={styles.arrow_down_icon}
                onClick={this.onClickProfile}
              />
              {showOverlayComponent ? (
                <OverlayContainer onClickLogout={this.onClickLogout} />
              ) : null}
            </div>
          ) : (
            <a
              className={`${styles.sigin_link} ${
                styles.header_item_container
              } ${whiteColor ? styles.is_white : ""}`}
              href="/signin"
            >
              {translate("header.login")}
            </a>
          )}
          {!isUserSignedIn && (
            <CapsuleButton
              className={` ${styles.sign_up_button} ${styles.header_item_container} `}
              onClick={this.onClickSignup}
            >
              {translate("header.register")}
            </CapsuleButton>
            // <a
            //   className={`${styles.sign_up_button} ${
            //     styles.header_item_container
            //   } ${whiteColor ? styles.is_white : ""}`}
            //   href="/signup"
            // >

            // </a>
          )}
          {/* <img src={hamburgerMenuIcon} className={`${styles.hamburger_icon} ${styles.header_item_container}`} /> */}
        </DivRow>
      </DivRow>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserSignedIn: state.signInReducer.isUserSignedIn,
    bagCount: 0 //state.bagReducer.bagCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translatorHoc(navigatorHoc(SectionedHeader)));
