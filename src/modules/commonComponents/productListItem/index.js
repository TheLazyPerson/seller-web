import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./product_list_item.module.scss";
import exhibitionImage from "Images/exhibition-item-1.jpg";
import isEmpty from "lodash/isEmpty";

class ProductListItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <DivColumn
        horizontalCenter
        className={styles.product_list_item_container}
      >
        <div className={styles.title}>{product.name}</div>
        <div className={styles.description}>{product.short_description}</div>
        {!isEmpty(product.thumbnail) && (
          <img src={product.thumbnail} className={styles.image} />
        )}

        <div className={styles.action_button}>Mark Out of Stock</div>
      </DivColumn>
    );
  }
}

export default ProductListItem;
