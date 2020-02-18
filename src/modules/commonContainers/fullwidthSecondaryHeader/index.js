import React, { Component } from "react";
import SectionedHeader from "CommonContainers/sectionedHeader";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from "./fullwidth_secondary_header.module.scss";
import LanguageSelect from "CommonComponents/languageSelect";
import appIcon from "Icons/app-icon-black.svg";
//import appIcon from "Icons/logo-image.png";
import navigatorHoc from "Hoc/navigatorHoc";
import SearchBar from "CommonContainers/searchBar";

import map from "lodash/map";

class FullwidthSecondaryHeader extends Component {
  onClickAppIcon = () => {
    const { navigateTo } = this.props;
    navigateTo("");
  };

  render() {
    const {
      children,
      whiteColor,
      className,
      navItems,
      onClickNavItem
    } = this.props;

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
          </DivRow>
        </DivRow>
        <DivRow className={styles.links_container}>
          {map(navItems, listItem => {
            const { title, slug } = listItem;
            return (
              <a
                className={styles.nav_item}
                onClick={() => {
                  onClickNavItem(slug);
                }}
              >
                {" "}
                {title}
              </a>
            );
          })}
        </DivRow>
      </DivColumn>
    );
  }
}

FullwidthSecondaryHeader.defaultProps = {
  whiteColor: false
};

export default navigatorHoc(FullwidthSecondaryHeader);
