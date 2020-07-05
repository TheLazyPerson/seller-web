/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import SectionedHeader from "CommonContainers/sectionedHeader";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from "./seller_proposition.module.scss";
import appIcon from "Icons/app-icon-black.svg";
import navigatorHoc from "Hoc/navigatorHoc";

class SellerProposition extends Component {
  onClickAppIcon = () => {
    const { navigateTo } = this.props;
    navigateTo("");
  };

  render() {
    const { className } = this.props;

    return (
      <DivColumn
        fillSelfHorizontal
        className={`${styles.top_header} ${className}`}
      >
        <DivRow className={`${styles.header_container}`}>
          <DivRow className={styles.header_icon_container}>
            <img
              src={appIcon}
              className={styles.app_icon}
              onClick={this.onClickAppIcon}
            />
            {/* <LanguageSelect blackColor={!whiteColor} /> */}
          </DivRow>
          <SectionedHeader />
        </DivRow>
        {/* <SearchBar
          className={styles.search_bar_container}
          whiteColor={whiteColor}
        /> */}
      </DivColumn>
    );
  }
}

SellerProposition.defaultProps = {
  whiteColor: false,
};

export default navigatorHoc(SellerProposition);
