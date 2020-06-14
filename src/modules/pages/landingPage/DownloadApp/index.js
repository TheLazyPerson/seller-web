/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./download_app.module.scss";
import heroImage from "Images/download-app.svg";
import playStoreImage from "Images/google-play-badge.png";
import appStoreImage from "Images/app-store-badge.svg";

class DownloadApp extends Component {
  render() {
    return (
      <DivColumn
        fillParent
        horizontalCenter
        className={styles.download_app_container}
      >
        <div className={styles.title}>
          The <span className={styles.highlighted}>Home Expo</span> Advantage
        </div>
        <div className={styles.description}>
          Manage Everyting at your fingertips.
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

export default navigatorHoc(DownloadApp);
