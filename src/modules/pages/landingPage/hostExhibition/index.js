import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { hostExhibitionConstants } from "Constants/hostExhibitionConstants";
import map from "lodash/map";
import styles from "./host_exhibition.module.scss";
import translatorHoc from "Hoc/translatorHoc";

class HostExhibition extends Component {
  hostExhibitionConstants = (listItem, index) => {
    const {
      languageReducer: { languageCode },
      translate,
    } = this.props;
    return (
      <DivRow
        fillParent
        className={`${styles.list_item} ${
          index % 2 == 0 ? styles.reverse_directions : ""
        }`}
      >
        <DivColumn className={styles.image_container}>
          <img className={styles.image} src={listItem.heroImage} />
        </DivColumn>
        <DivColumn className={styles.title_group}>
          <div className={styles.title}>{listItem[languageCode].title}</div>
          <div className={styles.description}>
            {listItem[languageCode].description}
          </div>
          <div className={styles.contact_number}>
            {translate("download_app.home_expo")} : {listItem.contact}
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

export default navigatorHoc(translatorHoc(HostExhibition));
