import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./download_app.module.scss";
import heroImage from "Images/download-app.svg";
import playStoreImage from "Images/google-play-badge.png";
import appStoreImage from "Images/app-store-badge.svg";
import translatorHoc from "Hoc/translatorHoc";

class DownloadApp extends Component {
  render() {
    const { translate } = this.props;
    return (
      <DivColumn
        fillParent
        horizontalCenter
        className={styles.download_app_container}
      >
        <div className={styles.title}>
          {translate("download_app.the")}{" "}
          <span className={styles.highlighted}>
            {" "}
            {translate("download_app.home_expo")}
          </span>{" "}
          {translate("download_app.advantage")}
        </div>
        <div className={styles.description}>
          {translate("download_app.subtitle")}
        </div>

        <img className={styles.image} src={heroImage} />

        <DivRow verticalCenter className={styles.badge_container}>
          <img className={styles.badge_icon} src={playStoreImage} />
          <img className={styles.apple_badge} src={appStoreImage} />
        </DivRow>
      </DivColumn>
    );
  }
}

export default navigatorHoc(translatorHoc(DownloadApp));
