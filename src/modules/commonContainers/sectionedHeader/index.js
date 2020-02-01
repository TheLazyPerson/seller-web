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
import translatorHoc from 'Hoc/translatorHoc';
import SearchBar from "../searchBar";

class SectionedHeader extends Component {
  clickedOnSearchItem = false;

  state = {
    searchText: "",
    showSearchResult: false
  };

  onClickProfile = () => {
    const { navigateTo } = this.props;
    navigateTo("profile");
  };

  onClickWishlist = () => {
    const { navigateTo } = this.props;
    navigateTo("wishlist");
  };

  onClickBag = () => {
    const { navigateTo } = this.props;
    navigateTo("checkout");
  };

  render() {
    const { isUserSignedIn, bagCount, whiteColor, translate } = this.props;

    return (
      <DivRow className={styles.header_container}>
        <SearchBar
          className={styles.search_bar_container}
          whiteColor={whiteColor}
        />
        
        <DivRow verticalCenter>
          <DivRow
            className={styles.header_item_container}
            verticalCenter
            onClick={this.onClickBag}
          >
            <img
              src={whiteColor ? bagIconWhite : bagIcon}
              className={styles.header_icon}
            />
            <DivRow
              verticalCenter
              horizontalCenter
              className={styles.bag_count}
            >
              {bagCount != null ? bagCount : 0}
            </DivRow>
          </DivRow>
          <img
            className={`${styles.header_icon} ${styles.header_item_container}`}
            src={whiteColor ? bookmarkIconWhite : bookmarkIcon}
            onClick={this.onClickWishlist}
          />
          {isUserSignedIn ? (
            <div
              style={{ height: "unset" }}
              className={`${styles.header_icon} ${styles.header_item_container}`}
              onClick={this.onClickProfile}
            >
              <img
                className={styles.profile_pic}
                src={whiteColor ? profileIconWhite : profileIconBlack}
              />
              {/* <img src={arrowDownIcon} className={styles.arrow_down_icon} /> */}
            </div>
          ) : (
            <a
              className={`${styles.sigin_link} ${
                styles.header_item_container
              } ${whiteColor ? styles.is_white : ""}`}
              href="/signin"
            >
              {translate('header.login')}
            </a>
          )}
          {!isUserSignedIn && (
            <a
              className={`${styles.sigin_link} ${
                styles.header_item_container
              } ${whiteColor ? styles.is_white : ""}`}
              href="/signup"
            >
              {translate('header.register')}
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
    isUserSignedIn: false, // state.signInReducer.isUserSignedIn,
    bagCount: 0//state.bagReducer.bagCount
  };
};

export default connect(mapStateToProps, null)(translatorHoc(navigatorHoc(SectionedHeader)));
