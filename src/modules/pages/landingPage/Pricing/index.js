import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./pricing.module.scss";
import closeIcon from "Icons/close-icon-black.svg";
import exhibitionIcon from "Icons/exhibition.svg";
import growthIcon from "Icons/growth.svg";
import rocketIcon from "Icons/rocket.svg";

class Pricing extends Component {
  render() {
    return (
      <DivRow fillParent className={styles.subscription_container}>
        <DivColumn
          fillParent
          className={`${styles.subscription} ${styles.is_selected}`}
        >
          <div className={styles.subscription_title}>Starter</div>
          <div className={styles.subscription_price}>KD 0 / Month</div>
          <div className={styles.subtitle}>Benefits Include:</div>
          <DivColumn fillParent className={styles.features}>
            <DivRow className={styles.feature}>
              <img
                alt="nav"
                src={exhibitionIcon}
                className={styles.feature_icon}
              />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.feature}>
              <img alt="nav" src={growthIcon} className={styles.feature_icon} />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.feature}>
              <img alt="nav" src={rocketIcon} className={styles.feature_icon} />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
          </DivColumn>
        </DivColumn>
        <DivColumn fillParent className={styles.subscription}>
          <div className={styles.subscription_title}>Starter</div>
          <div className={styles.subscription_price}>KD 0 / Month</div>
          <div className={styles.subtitle}>Benefits Include:</div>
          <DivColumn fillParent className={styles.features}>
            <DivRow className={styles.feature}>
              <img
                alt="nav"
                src={exhibitionIcon}
                className={styles.feature_icon}
              />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.feature}>
              <img alt="nav" src={growthIcon} className={styles.feature_icon} />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
            <DivRow className={styles.feature}>
              <img alt="nav" src={rocketIcon} className={styles.feature_icon} />
              <DivColumn className={styles.feature_details}>
                <div className={styles.feature_title}>10 Exhibitions</div>
                <div className={styles.feature_description}>
                  You can enroll in 10 number of exhibitions
                </div>
              </DivColumn>
            </DivRow>
          </DivColumn>
        </DivColumn>
        <DivColumn fillParent className={styles.subscription}>
          Subscription 3
        </DivColumn>
      </DivRow>
    );
  }
}

export default navigatorHoc(Pricing);
