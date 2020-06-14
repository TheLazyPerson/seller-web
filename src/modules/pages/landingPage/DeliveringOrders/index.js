/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { deliveringOrdersItems } from "Constants/deliveringOrdersConstants";
import map from "lodash/map";
import styles from "./delivering_orders.module.scss";

class DeliveringOrders extends Component {
  getDeliveringOrdersListItem = (listItem) => {
    return (
      <DivColumn className={styles.list_item}>
        <img className={styles.image} src={listItem.heroImage} />
        <DivColumn className={styles.title_group}>
          <div className={styles.title}>{listItem.title}</div>
          <div className={styles.description}>{listItem.description}</div>
        </DivColumn>
      </DivColumn>
    );
  };
  render() {
    return (
      <DivRow fillParent horizontalCenter className={styles.deliveringOrders}>
        {map(deliveringOrdersItems, (listItem) => {
          return this.getDeliveringOrdersListItem(listItem);
        })}
      </DivRow>
    );
  }
}

export default navigatorHoc(DeliveringOrders);
