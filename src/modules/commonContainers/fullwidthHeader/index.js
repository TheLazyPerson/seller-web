/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import SectionedHeader from "CommonContainers/sectionedHeader";
import DivRow from "CommonComponents/divRow";
import styles from "./fullwidth_header.module.scss";
import appIcon from "Icons/app-icon-black.svg";
//import appIcon from "Icons/logo-image.png";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import LanguageSelect from "CommonComponents/languageSelect";

class FullwidthHeader extends Component {
  onClickAppIcon = () => {
    const { navigateTo, isUserSignedIn } = this.props;
    if (!isUserSignedIn) {
      navigateTo("");
    }
    navigateTo("home");
  };

  render() {
    const { children, whiteColor, className, isRTL } = this.props;

    return (
      <div fillSelfHorizontal className={`${styles.top_header} ${className}`}>
        <DivRow
          className={` ${styles.header_container} ${isRTL ? styles.rtl : ""}`}
        >
          <DivRow className={styles.header_icon_container}>
            <img
              src={appIcon}
              className={styles.app_icon}
              onClick={this.onClickAppIcon}
            />
          </DivRow>
          <DivRow>
            <LanguageSelect blackColor={!whiteColor} />
          </DivRow>
          <SectionedHeader whiteColor={whiteColor} />
        </DivRow>
        {/* <SearchBar
          className={styles.search_bar_container}
          whiteColor={whiteColor}
        /> */}
      </div>
    );
  }
}

FullwidthHeader.defaultProps = {
  whiteColor: false,
};

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.signInReducer.isUserSignedIn,
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(mapStateToProps, null)(navigatorHoc(FullwidthHeader));
