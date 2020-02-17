import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./category_list_item.module.scss";
import exhibitionImage from "Images/exhibition-item-2.jpg";

class CategoryListItem extends Component {
  render() {
    return (
      <DivColumn
        className={styles.category_list_item_container}
        style={{
          background: `url(${exhibitionImage}) center no-repeat`,
          backgroundSize: "cover"
        }}
      >
        <DivColumn fillParent className={styles.inner_container}>
          <div className={styles.title}>Adidas Red Shoes</div>
        </DivColumn>
      </DivColumn>
    );
  }
}

export default CategoryListItem;
