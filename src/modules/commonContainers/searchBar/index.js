import React, { Component } from "react";
import styles from "./search_bar.module.scss";
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

class SearchBar extends Component {
  clickedOnSearchItem = false;

  state = {
    searchText: "",
    showSearchResult: false
  };

  onSearchItemSelected = type => {
    this.clickedOnSearchItem = true;
    this.navigateToSearchPage(type);
  };

  onSubmitSearch = () => {
    this.navigateToSearchPage(searchTypes.ALL);
  };

  navigateToSearchPage = searchType => {
    const { navigateTo } = this.props;
    const { searchText } = this.state;

    this.setState({
      showSearchResult: false
    });

    navigateTo("search", {
      searchType,
      searchText
    });
  };

  onChangeSearchText = event => {
    const text = event.target.value;

    this.setState({
      searchText: text
    });
  };

  showSearchBar = () => {
    const { showSearchResult } = this.state;

    if (!showSearchResult) {
      this.setState({ showSearchResult: true });
    }
  };

  hideSearchBar = () => {
    const { showSearchResult } = this.state;
    setTimeout(() => {
      if (showSearchResult && !this.clickedOnSearchItem) {
        this.setState({
          showSearchResult: false
        });
      }
    }, 300);
  };

  render() {
    const { searchText, showSearchResult } = this.state;
    const { translate, whiteColor, className, isRTL } = this.props;

    return (
      <div className={`${isRTL ? styles.rtl : ''} ${styles.search_container} ${className}`}>
        <DivRow
          className={`${styles.search_wrapper} ${
            searchText && showSearchResult ? styles.search_wrapper_expanded : ""
          }`}
        >
          <form className={styles.search_form} onSubmit={this.onSubmitSearch}>
            <input
              type="text"
              name="query"
              placeholder={translate("header.search")}
              className={`${styles.search_input} ${
                !(showSearchResult && searchText) && whiteColor
                  ? styles.is_white
                  : ""
              }`}
              onChange={this.onChangeSearchText}
              onFocus={this.showSearchBar}
              onBlur={this.hideSearchBar}
              autoComplete="off"
            />
          </form>
          <img
            src={
              !(showSearchResult && searchText) && whiteColor
                ? searchIconWhite
                : searchIcon
            }
            className={styles.search_icon}
          />
        </DivRow>

        <DivColumn
          className={`${styles.search_result_container} ${
            searchText && showSearchResult ? "" : styles.hide_search_bar
          }`}
        >
          <div className={styles.filling_gap}></div>
          <DivRow
            className={styles.search_item}
            onClick={() => this.onSearchItemSelected(searchTypes.EXHIBITIONS)}
          >
            <DivColumn>
              <div className={styles.title}>
                {translate("header.search_exhibition")}
              </div>
              <div className={styles.description}>{searchText}</div>
            </DivColumn>
            <img /> {/*Icon*/}
          </DivRow>

          <HorizontalBorder className={styles.divider} />

          <DivRow
            className={styles.search_item}
            onClick={() => this.onSearchItemSelected(searchTypes.PRODUCTS)}
          >
            <DivColumn>
              <div className={styles.title}>
                {translate("header.search_products")}
              </div>
              <div className={styles.description}>{searchText}</div>
            </DivColumn>
            <img /> {/*Icon*/}
          </DivRow>
        </DivColumn>
      </div>
    );
  }
}

export default navigatorHoc(translatorHoc(SearchBar));
