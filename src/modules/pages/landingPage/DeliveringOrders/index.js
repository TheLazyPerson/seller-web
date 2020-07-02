/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { deliveringOrdersItems } from "Constants/deliveringOrdersConstants";
import map from "lodash/map";
import styles from "./delivering_orders.module.scss";
import { connect } from "react-redux";

class DeliveringOrders extends Component {
  getDeliveringOrdersListItem = (listItem) => {
    const {
      languageReducer: { languageCode },
    } = this.props;
    return (
      <DivColumn className={styles.list_item}>
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
        horizontalCenter
        className={` ${styles.deliveringOrders} ${isRTL ? styles.rtl : ""}`}
      >
        {map(deliveringOrdersItems, (listItem) => {
          return this.getDeliveringOrdersListItem(listItem);
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

export default connect(mapStateToProps, null)(navigatorHoc(DeliveringOrders));
