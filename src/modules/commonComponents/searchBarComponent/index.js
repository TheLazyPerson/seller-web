import React, { Component } from 'react';
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from './search_bar_component.module.scss';
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import translatorHoc from "Hoc/translatorHoc";

class SearchBarComponent extends Component {

  render() {
     return (
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
     )
  }
}

export default navigatorHoc(translatorHoc(SearchBarComponent));