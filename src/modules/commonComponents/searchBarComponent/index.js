import React, { Component } from 'react';
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from './search_bar_component.module.scss';
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import translatorHoc from "Hoc/translatorHoc";
import searchIcon from "Icons/search-icon-black.svg";
import searchIconWhite from "Icons/search-icon-white.svg";

class SearchBarComponent extends Component {

  clickedOnSearchItem = false;

  state = {
    searchText: "",
    showSearchResult: false
  };

  onSubmitSearch = () => {
    // this.navigateToSearchPage(searchTypes.ALL);
  };

  onChangeSearchText = event => {
    const text = event.target.value;

    this.setState({
      searchText: text
    });
  };

  render() {
    const { searchText, showSearchResult } = this.state;
    const { translate, whiteColor, className, isRTL } = this.props;

    return (
      <div className={`${isRTL ? styles.rtl : ''} ${styles.search_container}`}>
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
      </div>
    )
  }
}

export default navigatorHoc(translatorHoc(SearchBarComponent));