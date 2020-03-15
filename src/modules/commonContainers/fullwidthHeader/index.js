import React, { Component } from "react";
import SectionedHeader from "CommonContainers/sectionedHeader";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from "./fullwidth_header.module.scss";
import LanguageSelect from "CommonComponents/languageSelect";
import appIcon from "Icons/app-icon-black.svg";
//import appIcon from "Icons/logo-image.png";
import navigatorHoc from "Hoc/navigatorHoc";
import SearchBar from "CommonContainers/searchBar";

class FullwidthHeader extends Component {
  onClickAppIcon = () => {
    const { navigateTo } = this.props;
    navigateTo("");
  };

  render() {
    const { children, whiteColor, className } = this.props;

    return (
      <div fillSelfHorizontal className={`${styles.top_header} ${className}`}>
        <DivRow className={`${styles.header_container}`}>
          <DivRow className={styles.header_icon_container}>
            <img
              src={appIcon}
              className={styles.app_icon}
              onClick={this.onClickAppIcon}
            />
            {/* <LanguageSelect blackColor={!whiteColor} /> */}
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
  whiteColor: false
};

export default navigatorHoc(FullwidthHeader);
