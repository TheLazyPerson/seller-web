import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./category_list_item.module.scss";
import filter from "lodash/filter";

class CategoryListItem extends Component {
  render() {
    const { category, isRTL, languageCode } = this.props;
    var translation = filter(category.translations, {
      locale: languageCode,
    })[0];

    const image = "https://source.unsplash.com/400x300/?" + translation.name;
    return (
      <DivColumn
        className={` ${styles.category_list_item_container} ${
          isRTL ? styles.rtl : ""
        }`}
        style={{
          background: `url(${image}) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <DivColumn fillParent className={styles.inner_container}>
          <div className={styles.title}>{translation.name}</div>
        </DivColumn>
      </DivColumn>
    );
  }
}

export default CategoryListItem;
