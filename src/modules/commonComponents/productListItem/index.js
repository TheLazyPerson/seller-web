import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./product_list_item.module.scss";
import exhibitionImage from "Images/exhibition-item-1.jpg";
import isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import navigatorHoc from "Hoc/navigatorHoc";

class ProductListItem extends Component {
  render() {
    const {
      product,
      exhibitionId,
      actionType,
      onClickAttachProduct,
      onClickRemoveProduct,
    } = this.props;
    const ACTION_TYPE_ATTACH_PRODUCT = "attach_product";
    const ACTION_TYPE_MARK_OUT_OF_STOCK = "mark_product_out_of_stock";
    const ACTION_TYPE_REMOVE_PRODUCT = "remove_product";

    return (
      <DivColumn
        horizontalCenter
        className={styles.product_list_item_container}
      >
        <div className={styles.title}>{product.name}</div>
        <div className={styles.description}>{product.short_description}</div>
        {!isEmpty(product.thumbnail) && (
          <img src={product.thumbnail.path} className={styles.image} />
        )}
        {!product.is_attached && actionType == ACTION_TYPE_ATTACH_PRODUCT && (
          <div
            className={styles.action_button}
            onClick={() => onClickAttachProduct(exhibitionId, product.id)}
          >
            ATTACH
          </div>
        )}
        {(product.is_attached || actionType == ACTION_TYPE_REMOVE_PRODUCT) && (
          <div
            className={styles.action_button}
            onClick={() => onClickRemoveProduct(exhibitionId, product.id)}
          >
            REMOVE
          </div>
        )}
        {!product.is_attached &&
          actionType == ACTION_TYPE_MARK_OUT_OF_STOCK && (
            <div className={styles.action_button}>
              MARK PRODUCT OUT OF STOCK
            </div>
          )}
      </DivColumn>
    );
  }
}

export default ProductListItem;
