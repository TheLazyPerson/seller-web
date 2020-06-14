/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { hostExhibitionConstants } from "Constants/hostExhibitionConstants";
import map from "lodash/map";
import styles from "./host_exhibition.module.scss";

class HostExhibition extends Component {
  hostExhibitionConstants = (listItem, index) => {
    return (
      <DivRow
        fillParent
        className={`${styles.list_item} ${
          index % 2 === 0 ? styles.reverse_directions : ""
        }`}
      >
        <DivColumn className={styles.image_container}>
          <img className={styles.image} src={listItem.heroImage} />
        </DivColumn>
        <DivColumn className={styles.title_group}>
          <div className={styles.title}>{listItem.title}</div>
          <div className={styles.description}>{listItem.description}</div>
          <div className={styles.contact_number}>
            CALL US AT: {listItem.contact}
          </div>
        </DivColumn>
      </DivRow>
    );
  };
  render() {
    return (
      <DivColumn fillParent className={styles.how_it_works}>
        {map(hostExhibitionConstants, (listItem, index) => {
          return this.hostExhibitionConstants(listItem, index);
        })}
      </DivColumn>
    );
  }
}

export default navigatorHoc(HostExhibition);
