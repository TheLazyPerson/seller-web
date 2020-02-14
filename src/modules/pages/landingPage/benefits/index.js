import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { benefitsListItems } from "Constants/benefitsConstants";
import map from "lodash/map";
import styles from "./benefits.module.scss";

class Benefits extends Component {
  getBenefitsListItem = listItem => {
    return (
      <DivColumn fillParent className={styles.list_item}>
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
      <DivRow fillParent className={styles.benefits}>
        {map(benefitsListItems, listItem => {
          return this.getBenefitsListItem(listItem);
        })}
      </DivRow>
    );
  }
}

export default navigatorHoc(Benefits);
