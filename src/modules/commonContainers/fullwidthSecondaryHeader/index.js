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
import { connect } from "react-redux";
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
      onClickNavItem,
      selectedTab,
      languageReducer: { languageCode },
      isRTL,
    } = this.props;

    return (
      <DivColumn
        fillSelfHorizontal
        className={`${styles.top_header} ${className}`}
      >
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
          <DivRow className={styles.links_container}>
            {map(navItems, (listItem) => {
              const { slug } = listItem;
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
                  {listItem[languageCode].title}
                </a>
              );
            })}
          </DivRow>
        </DivRow>
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

FullwidthSecondaryHeader.defaultProps = {
  whiteColor: false,
};
export default connect(
  mapStateToProps,
  null
)(navigatorHoc(FullwidthSecondaryHeader));
