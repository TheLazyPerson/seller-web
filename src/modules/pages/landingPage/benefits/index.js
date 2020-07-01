import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { benefitsListItems } from "Constants/benefitsConstants";
import map from "lodash/map";
import styles from "./benefits.module.scss";
import { connect } from "react-redux";

class Benefits extends Component {
  getBenefitsListItem = (listItem) => {
    const {
      languageReducer: { languageCode },
      isRTL,
    } = this.props;
    return (
      <DivColumn fillParent className={styles.list_item}>
        <img className={styles.image} src={listItem.heroImage} />
        <DivColumn className={styles.title_group}>
          <div className={styles.title}>{listItem[languageCode].title}</div>
          <div className={styles.description}>
            {listItem[languageCode].description}
          </div>
        </DivColumn>
      </DivColumn>
    );
  };
  render() {
    const { isRTL } = this.props;
    return (
      <DivRow
        fillParent
        className={` ${styles.benefits} ${isRTL ? styles.rtl : ""}`}
      >
        {map(benefitsListItems, (listItem) => {
          return this.getBenefitsListItem(listItem);
        })}
      </DivRow>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(mapStateToProps, null)(navigatorHoc(Benefits));
