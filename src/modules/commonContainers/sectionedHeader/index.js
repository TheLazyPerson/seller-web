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
import translatorHoc from "Hoc/translatorHoc";
import SearchBar from "../searchBar";
import OverlayContainer from './overlayContainer';

class SectionedHeader extends Component {
  clickedOnSearchItem = false;

  state = {
    searchText: "",
    showOverlayComponent: true,
  };

  onClickProfile = () => {
    const { showOverlayComponent } = this.state;

    this.setState({
      showOverlayComponent: !showOverlayComponent
    });
  };

  render() {
    const { isUserSignedIn, bagCount, whiteColor, translate } = this.props;
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
              <img src={arrowDownIcon} className={styles.arrow_down_icon} onClick={this.onClickProfile}
              />
              {
                showOverlayComponent ? (
                  <OverlayContainer />
                ) : null
              }
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
            <a
              className={`${styles.sigin_link} ${
                styles.header_item_container
                } ${whiteColor ? styles.is_white : ""}`}
              href="/signup"
            >
              {translate("header.register")}
            </a>
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

export default connect(
  mapStateToProps,
  null
)(translatorHoc(navigatorHoc(SectionedHeader)));
