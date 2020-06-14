import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./category_list_item.module.scss";

class CategoryListItem extends Component {
  render() {
    const { name } = this.props;
    const image = "https://source.unsplash.com/400x300/?" + name;
    console.log(image);
    return (
      <DivColumn
        className={styles.category_list_item_container}
        style={{
          background: `url(${image}) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <DivColumn fillParent className={styles.inner_container}>
          <div className={styles.title}>{name}</div>
        </DivColumn>
      </DivColumn>
    );
  }
}

export default CategoryListItem;
