/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from "./fullwidth_secondary_header.module.scss";
import appIcon from "Icons/app-icon-black.svg";
import navigatorHoc from "Hoc/navigatorHoc";

import map from "lodash/map";

class FullwidthSecondaryHeader extends Component {
  onClickAppIcon = () => {
    const { navigateTo } = this.props;
    navigateTo("");
  };

  render() {
    const { className, navItems, onClickNavItem, selectedTab } = this.props;

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
          <DivRow className={styles.links_container}>
            {map(navItems, (listItem) => {
              const { title, slug } = listItem;
              const isSelected = selectedTab === slug;
              return (
                <a
                  className={`${styles.nav_item} ${
                    isSelected ? styles.is_selected : ""
                  }`}
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
        </DivRow>
      </DivColumn>
    );
  }
}

FullwidthSecondaryHeader.defaultProps = {
  whiteColor: false,
};

export default navigatorHoc(FullwidthSecondaryHeader);
