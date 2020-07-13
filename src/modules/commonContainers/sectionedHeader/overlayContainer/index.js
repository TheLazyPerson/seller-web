import React, { Component, Fragment } from "react";
import styles from "./overlay_container.module.scss";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import { connect } from "react-redux";
import map from "lodash/map";
import translatorHoc from "Hoc/translatorHoc";

class OverlayContainer extends Component {
  render() {
    const {
      onClickLogout,
      isRTL,
      onClickBilling,
      subscriptionReducer: {
        isSubscriptionLoading,
        isSubscriptionError,
        featuresData,
      },
      translate,
    } = this.props;
    const ProgressItem = ({ title, value, progress }) => (
      <DivColumn className={`${styles.item_container} ${styles.click}`}>
        <DivRow className={styles.display_container}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value}</div>
        </DivRow>
        <DivRow className={styles.progress_bar_container}>
          <div
            style={{ width: `${progress}%` }}
            className={styles.progress_bar_filled}
          ></div>
        </DivRow>
      </DivColumn>
    );

    return (
      <DivColumn
        className={` ${styles.overlay_container} ${isRTL ? styles.rtl : ""}`}
      >
        <div
          className={`${styles.item_container} ${styles.title}`}
          style={{ cursor: "default" }}
        >
          {translate("overlay.usage")}
        </div>
        <HorizontalBorder />

        {!isSubscriptionLoading &&
          !isSubscriptionError &&
          map(featuresData, (feature) => (
            <Fragment>
              <ProgressItem
                title={feature.title}
                value={`${feature.used}/${feature.total}`}
                progress={feature.percentage}
              />

              <HorizontalBorder />
            </Fragment>
          ))}
        <div
          className={`${styles.item_container} ${styles.click}`}
          onClick={onClickBilling}
        >
          {translate("overlay.subscription")}
        </div>
        <HorizontalBorder />

        <div
          className={`${styles.item_container} ${styles.click}`}
          onClick={onClickLogout}
        >
          {translate("overlay.logout")}
        </div>
        <HorizontalBorder />
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscriptionReducer: state.subscriptionReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(mapStateToProps, null)(translatorHoc(OverlayContainer));
